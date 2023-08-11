<script>
	import { onMount } from "svelte";
	import { config }  from '$lib/config.js';
	import Link from '$lib/Link.svelte';

	/**
	 * @type {any[]}
	 */
	let chains = [];
	/**
	 * @type {any[]}
	 */
	let links = [];
	let ready = false;

	onMount(async () => {
		if (!$config) {
			fetch("http://localhost:8000"+ "/config")
			.then(response => response.json())
			.then(data => {
				config.set(data);
				links = Object.keys(data.links);
				ready = true;
			});
		}
		else {
			links = Object.keys($config.links);
			ready = true;
		}
	});
</script>

<style lang="postcss">
	:global(html) {
	  background-color: theme(colors.gray.100);
	}
</style>

{#if !ready}
	<p>Loading...</p>

{:else}
	<div class="grid grid-cols-3 gap-4">
		{#each links as link, index}
			<Link name={link} index=index/>
		{/each}
	</div>
{/if}
 