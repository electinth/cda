<script lang="ts">
  import Nav from '../components/nav.svelte';

  export let segment: string;

  $: activePath = segment || '';
</script>

<div class="flex flex-col min-h-screen">
  <Nav {activePath} />

  <slot />

  <elect-footer />
</div>
