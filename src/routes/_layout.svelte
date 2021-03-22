<script lang="ts">
  import { onMount } from 'svelte';

  import Nav from '../components/nav.svelte';

  export let segment: string;
  let showStagingBanner = false;

  onMount(() => {
    showStagingBanner = window.location.hostname.includes('github');
  });

  $: activePath = segment || '';
</script>

<div class="flex flex-col min-h-screen">
  {#if showStagingBanner}
    <staging-banner />
  {/if}
  <Nav {activePath} />
  <slot />
  <elect-footer />
</div>
