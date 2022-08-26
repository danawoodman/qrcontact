/**
 * Taken from https://github.com/babichjacob/svelte-localstorage
 *
 * Replace with that package when TypeScript support is working again.
 *
 * @see https://github.com/babichjacob/svelte-localstorage/issues/22
 */
import { writable, type Writable } from "svelte/store";
import { browser } from "$app/env";

type Update<T> = Writable<T>["update"];
type Set<T> = Writable<T>["set"];

export function local_storage_store<Item>(
	key: string,
	initial: Item,
	{
		serialize,
		deserialize,
	}: {
		serialize: (item: Item) => string;
		deserialize: (value: string) => Item;
	} = { serialize: JSON.stringify, deserialize: JSON.parse }
) {
	let current_value = initial;

	function sync_current_value(setStore: Writable<Item>["set"], value: Item) {
		setStore(value);
		current_value = value;
	}

	function parse_from_local_storage(local_value: string | null) {
		if (local_value === null) return initial;

		try {
			return deserialize(local_value);
		} catch (error) {
			console.error(
				`localStorage's value for \`${key}\` (\`${local_value}\`) could not be deserialized with ${deserialize} because of ${error}, so the initial value \`${initial}\` will be used instead`
			);
			return initial;
		}
	}

	const { set: setStore, subscribe } = writable(initial, (setStore) => {
		if (browser) {
			/** @type {string | null} */
			let local_storage_value = null;
			try {
				local_storage_value = localStorage.getItem(key);
			} catch (error) {
				console.error(
					`the \`${key}\` store's value could not be restored from localStorage because of ${error}, so the initial value \`${initial}\` will be used instead`
				);
			}

			sync_current_value(
				setStore,
				parse_from_local_storage(local_storage_value)
			);

			const set_from_storage_events = (event: StorageEvent) => {
				if (event.key === key)
					sync_current_value(
						setStore,
						parse_from_local_storage(event.newValue)
					);
			};
			window.addEventListener("storage", set_from_storage_events);
			return () =>
				window.removeEventListener("storage", set_from_storage_events);
		}
	});

	// Set both localStorage and this Svelte store
	function set(value: Parameters<Set<Item>>[0]): ReturnType<Set<Item>> {
		sync_current_value(setStore, value);

		try {
			const serialized = serialize(value);

			try {
				localStorage.setItem(key, serialized);
			} catch (error) {
				console.error(
					`the \`${key}\` store's new value \`${value}\` (which serialized to \`${serialized}\`) could not be persisted to localStorage because of ${error}`
				);
			}
		} catch (error) {
			console.error(
				`the \`${key}\` store was set to \`${value}\`, but this could not be serialized with ${serialize} because of ${error}, so it won't be persisted to localStorage`
			);
		}
	}

	function update(fn: Parameters<Update<Item>>[0]): ReturnType<Update<Item>> {
		set(fn(current_value));
	}

	return { set, subscribe, update };
}
