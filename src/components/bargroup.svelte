<script lang="ts">
  import type { ChartApperanceProps } from './animationConfig';

  import Barchart from './barchart.svelte';

  export let name, appearance: ChartApperanceProps;

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
</script>

<h1>{name}</h1>
<h2>
  from: {JSON.stringify(appearance.from)}
</h2>
<h2>
  to: {JSON.stringify(appearance.to)}
</h2>
<div class="w-full flex flex-row justify-end">
  <button class="mr-10 border-black border-2" on:click={replay}>replay</button>
</div>
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
