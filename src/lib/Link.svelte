<script>
    import { redis_cmd } from '$lib/redis_cmd.js';
	import { onMount } from 'svelte';

    export let name;
    export let index;
    let link = {};

    function safe_display(value) {
        if (typeof(value) == "object") {
            return JSON.stringify(value)
        } else {
            return value
        }
    }

    onMount(async () => {
        let cmd_array = ["JSON.GET","link:"+name]
        let host_url = 'http://localhost:7379/'
        let link_str = await redis_cmd(cmd_array, host_url)
        link = JSON.parse(link_str)
    });
</script>
{#if Object.keys(link).length === 0}
    <p>Loading...</p>
{:else}
    <div class="overflow-hidden bg-indigo-100 shadow sm:rounded-lg m-3">
        <div class="px-4 py-6 sm:px-6">
            {#if index == null}
                <h3 class="text-base font-semibold leading-7 text-gray-900">Link: {name}</h3>
            {:else}
                <h3 class="text-base font-semibold leading-7 text-gray-900">Link {index}: {name}</h3>
            {/if}
        </div>
        <div class="border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-900">Module</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{link.module}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-900">Ingress Lists</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{link["ingress-lists"]}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-900">Egress Lists</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{link["egress-lists"]}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-900">Options</dt>
                {#if link["options"] == null}
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">None</dd>
                {:else}
                    {#each Object.entries(link["options"]) as [key, value]}
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{key}: {safe_display(value)}</dd>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
{/if}
