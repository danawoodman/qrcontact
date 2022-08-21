<script lang="ts">
	import CloseIcon from "$lib/components/CloseIcon.svelte";
	import QrCode from "./QRCode.svelte";
	import { contact, file_name, vcard } from "$lib/stores/contact";
	import { fade, slide } from "svelte/transition";

	let qrcode: string;
	let view_vcard = false;

	function remove_by_index<T>(
		list: T[] | undefined,
		index: number,
		empty_value: T
	): T[] {
		const empty_arr = [empty_value] as T[];

		const result = list?.filter((_, i) => index !== i) ?? empty_arr;
		return result.length ? result : empty_arr;
	}

	function remove_url(index: number): void {
		$contact.urls = remove_by_index<ContactURL>($contact.urls, index, {
			label: "",
			href: "",
		});
	}

	function remove_address(index: number): void {
		$contact.addresses = remove_by_index<ContactAddress>(
			$contact.addresses,
			index,
			{
				label: "",
				street: "",
			}
		);
	}

	function remove_phone(index: number): void {
		$contact.phone_numbers = remove_by_index<ContactPhoneNumber>(
			$contact.phone_numbers,
			index,
			{
				label: "",
				number: "",
			}
		);
	}

	function remove_email(index: number): void {
		$contact.emails = remove_by_index<ContactEmail>($contact.emails, index, {
			label: "",
			address: "",
		});
	}
</script>

<main class="mx-auto max-w-prose px-8">
	<article class="flex flex-col items-center justify-center my-24">
		<div class="bg-white shadow-md rounded-lg p-4">
			<QrCode data={$vcard} bind:qrcode />
		</div>
		<p class="text-center mt-12 text-xl">
			<a href={qrcode} download="{$file_name}.png" class="btn --pill"
				>Download</a
			>
		</p>
	</article>

	<section id="name" class="">
		<h3 class="section-heading">Your name</h3>
		<fieldset class="flex items-center">
			<input
				type="text"
				class="input w-full"
				bind:value={$contact.first_name}
			/>
			<input
				type="text"
				class="input mx-2 w-20 sm:w-28"
				placeholder="Middle name..."
				bind:value={$contact.middle_name}
			/>
			<input
				type="text"
				class="input w-full"
				placeholder="Last name..."
				bind:value={$contact.last_name}
			/>
		</fieldset>
	</section>

	<section id="phone-numbers" class="mt-12">
		<h3 class="section-heading">Phone numbers</h3>
		{#if $contact?.phone_numbers?.length}
			{#each $contact.phone_numbers as phone, i}
				<fieldset
					class="my-4 flex items-center"
					transition:slide={{ duration: 200 }}
				>
					<input
						type="text"
						placeholder="Label..."
						class="input w-24 sm:w-32"
						bind:value={phone.label}
					/>
					<input
						type="text"
						placeholder="Phone number..."
						class="input ml-2 w-full flex-1"
						bind:value={phone.number}
					/>
					<button
						class="btn --sm --pill --icon ml-2"
						on:click={() => remove_phone(i)}
					>
						<CloseIcon />
					</button>
				</fieldset>
			{/each}
		{/if}
		<button
			class="link --sm"
			on:click={() => {
				$contact.phone_numbers = [
					...($contact.phone_numbers ?? []),
					{ label: "", number: "" },
				];
			}}
		>
			Add phone number
		</button>
	</section>

	<section id="emails" class="mt-12">
		<h3 class="section-heading">Email addresses</h3>
		{#if $contact?.emails?.length}
			{#each $contact.emails as email, i}
				<fieldset
					class="my-4 flex items-center"
					transition:slide={{ duration: 200 }}
				>
					<input
						type="text"
						placeholder="Label..."
						class="input w-24 sm:w-32"
						bind:value={email.label}
					/>
					<input
						type="text"
						placeholder="Email address..."
						class="input ml-2 w-full flex-1"
						bind:value={email.address}
					/>
					<button
						class="btn --sm --pill --icon ml-2"
						on:click={() => remove_email(i)}
					>
						<CloseIcon />
					</button>
				</fieldset>
			{/each}
		{/if}
		<button
			class="link --sm"
			on:click={() => {
				$contact.emails = [
					...($contact.emails ?? []),
					{ label: "", address: "" },
				];
			}}
		>
			Add email address
		</button>
	</section>

	<section id="urls" class="mt-12">
		<h3 class="section-heading">URLs</h3>
		{#if $contact?.urls?.length}
			{#each $contact.urls as email, i}
				<fieldset
					class="my-4 flex items-center"
					transition:slide={{ duration: 200 }}
				>
					<input
						type="text"
						placeholder="Label..."
						class="input w-24 sm:w-32"
						bind:value={email.label}
					/>
					<input
						type="text"
						placeholder="Email address..."
						class="input ml-2 w-full flex-1"
						bind:value={email.href}
					/>
					<button
						class="btn --sm --pill --icon ml-2"
						on:click={() => remove_url(i)}
					>
						<CloseIcon />
					</button>
				</fieldset>
			{/each}
		{/if}
		<button
			class="link --sm"
			on:click={() => {
				$contact.urls = [...($contact.urls ?? []), { label: "", href: "" }];
			}}
		>
			Add URL
		</button>
	</section>

	<section id="addresses" class="mt-12">
		<h3 class="section-heading">Addresses</h3>
		{#if $contact?.addresses?.length}
			{#each $contact.addresses as address, i}
				<fieldset
					class="my-6 sm:flex items-start"
					transition:slide={{ duration: 200 }}
				>
					<div class="sm:w-32">
						<input
							type="text"
							placeholder="Label..."
							class="input --block"
							bind:value={address.label}
						/>
					</div>
					<div class="flex-1 sm:ml-2">
						<div class="flex flex-col sm:flex-row items-center">
							<input
								type="text"
								placeholder="Street address..."
								class="input w-full mt-2 sm:mr-2 sm:mt-0"
								bind:value={address.street}
							/>
							<input
								type="text"
								placeholder="Street address 2..."
								class="input w-full mt-2 sm:mt-0"
								bind:value={address.street_2}
							/>
						</div>
						<div class="flex items-center mt-2">
							<input
								type="text"
								placeholder="City..."
								class="input w-full mr-2"
								bind:value={address.city}
							/>
							<input
								type="text"
								placeholder="State..."
								class="input w-full"
								bind:value={address.state_province}
							/>
						</div>
						<div class="flex items-center mt-2">
							<input
								type="text"
								placeholder="Postal code..."
								class="input w-full mr-2"
								bind:value={address.postal_code}
							/>
							<input
								type="text"
								placeholder="Country..."
								class="input w-full"
								bind:value={address.country_region}
							/>
						</div>
					</div>
					<button
						class="btn --sm --pill --icon mt-2 sm:mt-0 sm:ml-2"
						on:click={() => remove_address(i)}
					>
						<CloseIcon />
					</button>
				</fieldset>
			{/each}
		{/if}
		<button
			class="link --sm"
			on:click={() => {
				$contact.addresses = [
					...($contact.addresses ?? []),
					{ label: "", street: "" },
				];
			}}
		>
			Add address
		</button>
	</section>

	<p class="mt-20 mb-4">
		<button class="link --sm" on:click={() => (view_vcard = !view_vcard)}>
			{#if view_vcard}
				Hide
			{:else}
				View raw vCard data
			{/if}
		</button>
	</p>

	{#if view_vcard}
		<div transition:slide>
			<pre class="p-6 bg-slate-200 rounded-md overflow-auto">{$vcard}</pre>
		</div>
	{/if}
</main>

<style lang="postcss">
	.section-heading {
		@apply font-bold mb-4 text-slate-500;
	}
</style>
