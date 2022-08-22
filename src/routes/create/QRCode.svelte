<script lang="ts">
	import { toDataURL } from "qrcode";

	export let data: string;
	export let qrcode: string;

	$: promise = toDataURL(data).then((url) => {
		qrcode = url;
		return url;
	});
</script>

{#await promise}
	<p class="text-slate-600 italic text-sm">Loading QR code...</p>
{:then value}
	<img src={value} alt="QR Code" />
{:catch error}
	<p class="text-red-700 bg-red-50 px-6 py-4 rounded-md">
		⚠️ {error}
	</p>
{/await}
