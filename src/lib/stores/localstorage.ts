/**
 * Taken from https://github.com/babichjacob/svelte-localstorage
 *
 * Replace with that package when they support TypeScript.
 *
 * @see https://github.com/babichjacob/svelte-localstorage/issues/22
 */
import { writable, type Writable } from "svelte/store";
import { browser } from "$app/env";

type Update<T> = Writable<T>["update"];
type Set<T> = Writable<T>["set"];

export function localStorageStore<Item>(
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
	let currentValue = initial;

	function syncCurrentValue(setStore: Writable<Item>["set"], value: Item) {
		setStore(value);
		currentValue = value;
	}

	function parseFromLocalStorage(localValue: string | null) {
		if (localValue === null) return initial;

		try {
			return deserialize(localValue);
		} catch (error) {
			console.error(
				`localStorage's value for \`${key}\` (\`${localValue}\`) could not be deserialized with ${deserialize} because of ${error}, so the initial value \`${initial}\` will be used instead`
			);
			return initial;
		}
	}

	const { set: setStore, subscribe } = writable(initial, (setStore) => {
		if (browser) {
			/** @type {string | null} */
			let localStorageValue = null;
			try {
				localStorageValue = localStorage.getItem(key);
			} catch (error) {
				console.error(
					`the \`${key}\` store's value could not be restored from localStorage because of ${error}, so the initial value \`${initial}\` will be used instead`
				);
			}

			syncCurrentValue(setStore, parseFromLocalStorage(localStorageValue));

			const setFromStorageEvents = (event: StorageEvent) => {
				if (event.key === key)
					syncCurrentValue(setStore, parseFromLocalStorage(event.newValue));
			};
			window.addEventListener("storage", setFromStorageEvents);
			return () => window.removeEventListener("storage", setFromStorageEvents);
		}
	});

	// Set both localStorage and this Svelte store
	function set(value: Parameters<Set<Item>>[0]): ReturnType<Set<Item>> {
		syncCurrentValue(setStore, value);

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
		set(fn(currentValue));
	}

	return { set, subscribe, update };
}
