<script>
    import { redis_cmd } from '$lib/redis_cmd.js';
	import { onMount } from 'svelte';
    import Link from '$lib/Link.svelte';

    export let name;
    let chain = {};
    let links = [];

    function safe_display(value) {
        if (typeof(value) == "object") {
            return JSON.stringify(value)
        } else {
            return value
        }
    }

    onMount(async () => {
        let cmd_array = ["JSON.GET", name]
        let host_url = 'http://localhost:7379/'
        let chain_str = await redis_cmd(cmd_array, host_url)
        chain = JSON.parse(chain_str)
        links = chain.links
        console.log(chain)
    });
</script>
{#if Object.keys(chain).length === 0}
    <p>Loading...</p>
{:else}
    <div class="m-3 justify-items-center">
        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
            <div class="px-4 py-6 sm:px-6">
                <h3 class="text-base font-semibold leading-7 text-gray-900">{name}</h3>
                <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    A <a href="https://docs.vcon.dev/overview/concepts#chain" target="_blank" class="text-indigo-600 hover:text-indigo-500">chain</a> 
                    is a sequence of <a href="https://docs.vcon.dev/overview/concepts#chain" target="_blank" class="text-indigo-600 hover:text-indigo-500">links</a> 
                    that are executed in order. vCons are processed when their IDs are inserted into one of the REDIS ingress lists; it forwards those 
                    vCon IDs to all of the egress lists after the chain is finished.  In addition to being stored in REDIS, vCons are also stored in
                    the configured <a href="https://docs.vcon.dev/overview/concepts#storage" target="_blank" class="text-indigo-600 hover:text-indigo-500">storages</a>.  
                </p>
            </div>
            <div class="border-t border-gray-100">
                <dl class="divide-y divide-gray-100">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-900">Ingress Lists</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{safe_display(chain.ingress_lists)}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-900">Storages</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{safe_display(chain.storages)}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-900">Enabled</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{safe_display(chain.enabled)}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-900">Egress Lists</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{safe_display(chain.egress_lists)}</dd>
                </div>
            </div>
        </div>
    </div>
    <div class="m-3">
        <div class="grid grid-cols-3 gap-4">
            <div class="col-span-1">
                <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Links represent a functionality block; chains are constructed from links, which can be used more than once. 
                    Links are executed in the order they are defined in the chain. 
                    Learn more about links <a href="https://docs.vcon.dev/overview/concepts#link" target="_blank" class="text-indigo-600 hover:text-indigo-500">here</a>.
                </p>
    
            </div>
            <div class="col-span-2">
                {#each links as link, index}
                    <Link name={link} index={index} />
                {/each}
            </div>
        </div>
    </div>
{/if}
