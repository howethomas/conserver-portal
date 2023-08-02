<script>
	import { onMount } from "svelte";
    import {redis_cmd} from '$lib/redis_cmd.js';
	let mem_status = {};
    let redis_stats = {};
  
	onMount(async () => {
        let cmd_array = ["INFO", "MEMORY"]
        let host_url = 'http://localhost:7379/'
        mem_status = await redis_cmd(cmd_array, host_url)
        cmd_array = ["INFO", "STATS"]
        redis_stats = await redis_cmd(cmd_array, host_url)
	});
</script>

<style lang="postcss">
	:global(html) {
	  background-color: theme(colors.gray.100);
	}
</style>

<div class="min-h-full lg">
	{#if Object.keys(redis_stats).length === 0}
		<p>Loading...</p>
    {:else}
    <div class="grid grid-flow-col auto-cols-max">
        <div>
            <h1 class="font-bold">Memory Status</h1>
            <ul>
                {#each Object.entries(mem_status) as [key, value]}
                <li class="list-disc">
                    <span class="font-bold">{key}</span>: {value}</li>
                {/each}
            </ul>    
        </div>
        <div>
            <h1 class="font-bold">Redis Stats</h1>
            <ul>
                {#each Object.entries(redis_stats) as [key, value]}
                <li class="list-disc">
                    <span class="font-bold">{key}</span>: {value}</li>
                {/each}
            </ul>
                
        </div>

    </div>
	{/if}
</div>
 