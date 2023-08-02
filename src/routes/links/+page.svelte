<script>
	import { onMount } from "svelte";
	import {redis_cmd} from '$lib/redis_cmd.js';
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
		// Get the list of chains
		let cmd_array = ["KEYS", "chain:*"]
		chains = await redis_cmd(cmd_array)

		// Get the list of links
		cmd_array = ["KEYS", "link:*"]
		let keys = await redis_cmd(cmd_array)

		// the keys have a prefix of "link:" or "chain:"; remove it
		links = keys.map((key) => key.slice(5))
		ready = true;
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
		{#each links as link}
			<Link name={link} />
		{/each}
	</div>
{/if}
 