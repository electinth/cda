<script lang="ts">
  import IntersectionObserver from 'svelte-intersection-observer';
  import type { ChartApperanceProps } from './animationConfig';

  import Barchart from './barchart.svelte';

  export let appearance: ChartApperanceProps;

  export let X: d3.ScaleLinear<number, number, never>,
    data2491,
    data2502,
    data2539,
    data2550;

  let bar2491: Barchart,
    bar2502: Barchart,
    bar2539: Barchart,
    bar2550: Barchart;
  function replay() {
    bar2491.replay();
    bar2502.replay();
    bar2539.replay();
    bar2550.replay();
  }
  let ref;
  let intersecting;

  let played = false;
  $: {
    if (intersecting && !played) {
      replay();
    }
  }
</script>

<IntersectionObserver element={ref} bind:intersecting>
  <div class="w-full flex flex-row justify-end">
    <button class="mr-10 border-black border-2" on:click={replay}>replay</button
    >
  </div>
  <div
    bind:this={ref}
    class="w-full h-full flex flex-col justify-evenly items-center"
  >
    <div class="w-full h-20">
      <Barchart bind:this={bar2491} {X} data={data2491} {appearance} />
    </div>
    <div class="w-full h-20">
      <Barchart bind:this={bar2502} {X} data={data2502} {appearance} />
    </div>
    <div class="w-full h-20">
      <Barchart bind:this={bar2539} {X} data={data2539} {appearance} />
    </div>
    <div class="w-full h-20">
      <Barchart bind:this={bar2550} {X} data={data2550} {appearance} />
    </div>
  </div>
</IntersectionObserver>
