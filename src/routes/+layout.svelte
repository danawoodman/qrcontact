<script>
	import "../app.postcss";
	import Footer from "$lib/components/Footer.svelte";
	import Header from "$lib/components/Header.svelte";
	import { navigating } from "$app/stores";
	import { fade } from "svelte/transition";

	let duration = 300;

	$: changed = $navigating?.from !== $navigating?.to;
</script>

<Header />

{#key changed}
	<div in:fade={{ delay: duration, duration }} out:fade={{ duration }}>
		<slot />
	</div>
{/key}

<Footer />
