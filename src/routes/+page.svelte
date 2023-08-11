<script>
	import { onMount } from "svelte";
	import {redis_cmd} from '$lib/redis_cmd.js';
	import Chain from '$lib/Chain.svelte';

	/**
	 * @type {any[]}
	 */
	let chains = [];
	let ready = false;

	onMount(async () => {
		// Get the list of chains
		let cmd_array = ["KEYS", "chain:*"]
		chains = await redis_cmd(cmd_array)

		// Get the list of chains
		cmd_array = ["KEYS", "chain:*"]
		chains = await redis_cmd(cmd_array)
		ready = true;
	});
</script>

<style lang="postcss">
	:global(html) {
	  background-color: theme(colors.gray.100);
	}
</style>
<h1>
    Hello!
</h1>