<script>
    import { config }  from '$lib/config.js';
	import { onMount } from 'svelte';
    import { safe_display } from '$lib/utils.js';
    

    export let uuid = "";
    export let vcon = {};

    onMount(async () => {
        let response = await fetch("http://localhost:8000/vcon/" + uuid);
        let data = await response.json();
        vcon = data;
    });
</script>
{#if vcon == null}
    <p>Loading...</p>
{:else}
    <div class="overflow-hidden bg-indigo-100 shadow sm:rounded-lg m-3">
        <div class="px-4 py-6 sm:px-6">
            <h3 class="text-base font-semibold leading-7 text-gray-900">vCon: {uuid}</h3>
        </div>
        <div class="border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-900">Module</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{vcon.uuid}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-900">Ingress Lists</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{vcon.uuid}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-900">Egress Lists</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{vcon.uuid}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-900">Options</dt>
                {#if vcon.uuid == null}
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">None</dd>
                {:else}
                    {#each Object.entries(vcon.uuid) as [key, value]}
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{key}: {safe_display(value)}</dd>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
    {/if}
{/if}
