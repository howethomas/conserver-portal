<script>
	import { onMount } from "svelte";
	import Chain from '$lib/Chain.svelte';
	import {config}  from '$lib/config.js';

	/**
	 * @type {any[]}
	 */
	let chains = [];
	let ready = false;
	onMount(async () => {
		if (!$config) {
			fetch("http://localhost:8000"+ "/config")
			.then(response => response.json())
			.then(data => {
				console.log(data);
				config.set(data);
				chains = Object.keys(data.chains);
				ready = true;
				console.log("Fetched")
			});
		}
		else {
			chains = Object.keys($config.chains);
			ready = true;
		}
		console.log("Mounted")
		console.log($config)
		console.log(chains)
	});
	$: console.log("Chains: ", chains)
</script>

<style lang="postcss">
	:global(html) {
	  background-color: theme(colors.gray.100);
	}
</style>

{#if !ready}
	<p>Loading...</p>

{:else}
	{#each chains as chain}
		<Chain name={chain} />
	{/each}
{/if}
 