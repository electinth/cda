<script>
  import CdaSpace from '../components/cda-space/index.svelte';
</script>

<svelte:head>
  <title>ELECT - CDA</title>
</svelte:head>

<section>
  <CdaSpace />
</section>

<style lang="scss">
  section {
    height: calc(100vh - 2.5rem);

    @media (min-width: 768px) {
      height: calc(100vh - 3rem);
    }
  }
</style>
