<script lang="ts">
  import Nav from '../components/nav.svelte';

  export let segment: string;
</script>

<div class="flex flex-col min-h-screen">
  <Nav {segment} />

  <slot />

  <elect-footer />
</div>
