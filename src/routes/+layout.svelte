<script>
	import "../app.postcss";
	import Footer from "$lib/components/Footer.svelte";
	import Header from "$lib/components/Header.svelte";
	import { navigating } from "$app/stores";
	import { fade } from "svelte/transition";

	let duration = 200;

	$: changed = $navigating?.from !== $navigating?.to;
</script>

<svelte:head>
	<title>qrcontact - QR code contact generator by Dana Woodman</title>
	<meta
		name="description"
		content="Generate a QR code for your contact information, share it with friends and customers."
	/>
</svelte:head>

<Header />

{#key changed}
	<div in:fade={{ delay: duration, duration }} out:fade={{ duration }}>
		<slot />
	</div>
{/key}

<Footer />
