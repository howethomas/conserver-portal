<script>
    import VconLoader from '$lib/VconLoader.svelte';
	import { onMount } from 'svelte';
    
    // On mount, load the list of vcon keys in REDIS
    /**
	 * @type {any[]}
	 */
    let vcon_keys = [];
    let ready = false;

    onMount(async () => {
        ready = true;
    });

  </script>
  
  <VconLoader />
  
    {#if !ready}
        <p>Loading...</p>
    {:else}
        <div class="grid grid-cols-3 gap-4">
            <ul>
                {#each vcon_keys as vcon_key}
                    <li class="list-disc">{vcon_key}</li>
                {/each}
            </ul>
        </div>
    {/if}