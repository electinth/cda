<script>
  import Origin from '../components/visualizations/origin.svelte';
  import DemoIndividual from '../components/visualizations/demo-individual.svelte';
  import BarSection from '../components/bar-section.svelte';
  import Variety from '../components/visualizations/variety.svelte';
  import Sexuality from '../components/visualizations/sexuality.svelte';
</script>

<svelte:head>
  <title>ELECT - CDA</title>
</svelte:head>

<section>
  <h1 class="text-h3 font-bold text-center">ที่มาของสสร.</h1>
  <Origin />

  <h1 class="text-h3 font-bold text-center">ความหลากหลายของ สสร.</h1>
  <Variety />

  <h1 class="text-h3 font-bold text-center">เพศสภาพกับ สสร.</h1>
  <Sexuality />

  <h2>Demo Space Individual</h2>
  <DemoIndividual />
</section>
<section>
  <BarSection />
</section>
