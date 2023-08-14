<script>
    import VconLoader from '$lib/VconLoader.svelte';
	import { onMount } from 'svelte';

	/**
	 * @type {any[]}
	 */
	$: vcon_keys = [];
	$: vcons = {};
	$: ready = false;
    let displayed_vcon = {};

	onMount(async () => {
		// Get the list of vcon ids using REST
		let response = await fetch('http://localhost:8000' + '/vcon');
		let data = await response.json();
		vcon_keys = data;

        // For each vcon id, get the vcon data using REST
        for (let vcon_key of vcon_keys) {
            response = await fetch('http://localhost:8000' + '/vcon/' + vcon_key);
            data = await response.json();
            vcons[vcon_key] = data;
        }

        ready = true;

	});

    function set_display_vcon(vcon) {
        console.log(vcon.created_at)
        displayed_vcon = vcon;
    }
</script>

<div class="text-right">
    <VconLoader />
</div>

{#if !ready}
	<p>Loading...</p>
{:else}
	<div class="grid grid-cols-2 gap-4">
        <div>
            <div class="flow-root">
                <ul role="list" class="-mb-8">
                    {#each vcon_keys as vcon_key}
                        <li on:click={set_display_vcon(vcons[vcon_key])}>
                            <div class="relative pb-8">
                                <span class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                <div class="relative flex space-x-3">
                                    <div>
                                        <span class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                                            <svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p class="text-sm text-gray-500">New vCon <a href="#" class="font-medium text-gray-900">{vcon_key}</a></p>
                                        </div>
                                        <div class="whitespace-nowrap text-right text-sm text-gray-500">
                                            <time datetime=vcons[vcon_key].created_at>{vcons[vcon_key].created_at}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
        <div class="text-xs">
            { #if displayed_vcon }
                {#each Object.entries(displayed_vcon) as [key, value]}
                    <p class="border border-gray-600">{key}: {JSON.stringify(value, null, '\t')}</p>
                {/each}
            {/if}
        </div>
	</div>
{/if}
