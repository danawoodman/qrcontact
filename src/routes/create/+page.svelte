<script lang="ts">
	import CloseIcon from "$lib/components/CloseIcon.svelte";
	// import PhotoUploader from "$lib/components/PhotoUploader.svelte";
	import { contact, file_name, vcard } from "$lib/stores/contact";
	import { slide } from "svelte/transition";
	import QrCode from "./QRCode.svelte";

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

<main class="px-4">
	<div class="md:flex items-start mx-auto justify-center">
		<div class="max-w-prose md:mr-12">
			<!-- <section id="photo" class="mt-20">
				<PhotoUploader />
			</section> -->

			<section id="name" class="my-12">
				<h1 class="section-heading">Your name</h1>
				<fieldset class="flex items-center">
					<input
						aria-label="First name"
						autocomplete="given-name"
						type="text"
						name="first-name"
						class="input w-full"
						placeholder="First name..."
						bind:value={$contact.first_name}
					/>
					<input
						aria-label="Middle name"
						autocomplete="additional-name"
						type="text"
						name="middle-name"
						class="input mx-2 w-20 sm:w-28"
						placeholder="Middle name..."
						bind:value={$contact.middle_name}
					/>
					<input
						aria-label="Last name"
						autocomplete="family-name"
						type="text"
						name="last-name"
						class="input w-full"
						placeholder="Last name..."
						bind:value={$contact.last_name}
					/>
				</fieldset>
				<fieldset class="flex items-center mt-2">
					<input
						aria-label="Nickname"
						autocomplete="nickname"
						type="text"
						name="nickname"
						class="input w-full"
						placeholder="Nickname..."
						bind:value={$contact.nickname}
					/>
				</fieldset>
			</section>

			<section id="organization" class="my-12">
				<h1 class="section-heading">Company</h1>
				<fieldset class="flex items-center">
					<input
						aria-label="Job title"
						autocomplete="organization-title"
						type="text"
						name="job-title"
						class="input w-full w-36"
						placeholder="Job title..."
						bind:value={$contact.title}
					/>
					<span class="mx-2">at</span>
					<input
						aria-label="Organization/company"
						autocomplete="organization"
						type="text"
						name="organization"
						class="input w-full"
						placeholder="Company/organization name..."
						bind:value={$contact.organization}
					/>
				</fieldset>
			</section>

			<section id="phone-numbers" class="my-12">
				<h1 class="section-heading">Phone numbers</h1>
				{#if $contact?.phone_numbers?.length}
					{#each $contact.phone_numbers as phone, i}
						<fieldset
							class="my-2 flex items-center"
							transition:slide={{ duration: 200 }}
						>
							<input
								aria-label="Phone number label"
								type="phone"
								name="phone"
								placeholder="Label..."
								class="input w-24 sm:w-36"
								bind:value={phone.label}
							/>
							<input
								aria-label="Phone number"
								autocomplete="tel"
								type="text"
								placeholder="Phone number..."
								class="input ml-2 w-full flex-1"
								bind:value={phone.number}
							/>
							<button
								class="btn --sm --icon ml-2"
								on:click={() => remove_phone(i)}
								aria-label="Remove phone number"
							>
								<CloseIcon />
							</button>
						</fieldset>
					{/each}
				{/if}
				<p class="mt-4">
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
				</p>
			</section>

			<section id="emails" class="my-12">
				<h1 class="section-heading">Email addresses</h1>
				{#if $contact?.emails?.length}
					{#each $contact.emails as email, i}
						<fieldset
							class="my-2 flex items-center"
							transition:slide={{ duration: 200 }}
						>
							<input
								aria-label="Email address label"
								type="email"
								name="email"
								placeholder="Label..."
								class="input w-24 sm:w-36"
								bind:value={email.label}
							/>
							<input
								aria-label="Email address"
								autocomplete="email"
								type="text"
								placeholder="Email address..."
								class="input ml-2 w-full flex-1"
								bind:value={email.address}
							/>
							<button
								class="btn --sm --icon ml-2"
								on:click={() => remove_email(i)}
								aria-label="Remove email address"
							>
								<CloseIcon />
							</button>
						</fieldset>
					{/each}
				{/if}
				<p class="mt-4">
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
				</p>
			</section>

			<section id="urls" class="my-12">
				<h1 class="section-heading">URLs</h1>
				{#if $contact?.urls?.length}
					{#each $contact.urls as email, i}
						<fieldset
							class="my-2 flex items-center"
							transition:slide={{ duration: 200 }}
						>
							<input
								aria-label="URL label"
								type="text"
								name="url"
								placeholder="Label..."
								class="input w-24 sm:w-36"
								bind:value={email.label}
							/>
							<input
								aria-label="URL"
								autocomplete="url"
								type="text"
								placeholder="Email address..."
								class="input ml-2 w-full flex-1"
								bind:value={email.href}
							/>
							<button
								class="btn --sm --icon ml-2"
								on:click={() => remove_url(i)}
								aria-label="Remove URL"
							>
								<CloseIcon />
							</button>
						</fieldset>
					{/each}
				{/if}
				<p class="mt-4">
					<button
						class="link --sm"
						on:click={() => {
							$contact.urls = [
								...($contact.urls ?? []),
								{ label: "", href: "" },
							];
						}}
					>
						Add URL
					</button>
				</p>
			</section>

			<section id="addresses" class="my-12">
				<h1 class="section-heading">Addresses</h1>
				{#if $contact?.addresses?.length}
					{#each $contact.addresses as address, i}
						<fieldset
							class="my-4 sm:flex items-start"
							transition:slide={{ duration: 200 }}
						>
							<div class="sm:w-36">
								<input
									aria-label="Address label"
									type="text"
									placeholder="Label..."
									class="input --block"
									bind:value={address.label}
								/>
							</div>
							<div class="flex-1 sm:ml-2">
								<div class="flex flex-col sm:flex-row items-center">
									<input
										aria-label="Address street address"
										autocomplete="street-line1"
										name="street-address"
										type="text"
										placeholder="Street address..."
										class="input w-full mt-2 sm:mr-2 sm:mt-0"
										bind:value={address.street}
									/>
									<input
										aria-label="Address secondary street address"
										autocomplete="address-line2"
										type="text"
										name="street-address-2"
										placeholder="Street address 2..."
										class="input w-full mt-2 sm:mt-0"
										bind:value={address.street_2}
									/>
								</div>
								<div class="flex items-center mt-2">
									<input
										aria-label="Address city"
										autocomplete="city"
										type="text"
										name="city"
										placeholder="City..."
										class="input w-full mr-2"
										bind:value={address.city}
									/>
									<input
										aria-label="Address state"
										autocomplete="state"
										type="text"
										name="state"
										placeholder="State..."
										class="input w-full"
										bind:value={address.state_province}
									/>
								</div>
								<div class="flex items-center mt-2">
									<input
										aria-label="Address postal code"
										autocomplete="postal-code"
										type="text"
										name="postal-code"
										placeholder="Postal code..."
										class="input w-full mr-2"
										bind:value={address.postal_code}
									/>
									<input
										aria-label="Address country"
										autocomplete="country"
										type="text"
										name="country"
										placeholder="Country..."
										class="input w-full"
										bind:value={address.country_region}
									/>
								</div>
							</div>
							<button
								class="btn --sm --icon mt-2 sm:mt-0 sm:ml-2"
								on:click={() => remove_address(i)}
								aria-label="Remove address"
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
		</div>

		<section
			id="qrcode"
			class="my-12 flex flex-col items-center justify-center"
		>
			<div class="bg-white shadow-md rounded-lg p-4 md:w-64 md:h-64">
				<QrCode data={$vcard} bind:qrcode />
			</div>
			<p class="text-center mt-12">
				<a href={qrcode} download="{$file_name}.png" class="btn">Download</a>
			</p>
		</section>
	</div>

	<div class="mx-auto max-w-prose">
		<section id="vcard-data">
			<p class="mt-20 mb-4 text-center">
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
					<pre
						class="p-6 bg-slate-200 dark:bg-slate-800 rounded-md overflow-auto">{$vcard}</pre>
				</div>
			{/if}
		</section>

		<section
			id="security-note"
			class="text-sm text-slate-500 dark:text-slate-300 mt-12 text-center"
		>
			<p class="mb-2">
				🔐 <strong>Security note:</strong>
			</p>
			<p>Nothing you input on this page leaves this page, your data is safe!</p>
		</section>
	</div>
</main>

<style lang="postcss">
	.section-heading {
		@apply font-bold mb-4 text-slate-500 dark:text-slate-300;
	}
</style>
