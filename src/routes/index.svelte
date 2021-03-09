<script>
  import CdaSpace from '../components/cda-space.svelte';
</script>

<svelte:head>
  <title>ELECT - CDA</title>
</svelte:head>

<div class="h-screen">
  <CdaSpace on:nodeclick={console.log} />
</div>
