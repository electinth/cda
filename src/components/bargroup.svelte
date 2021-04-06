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
  export let barWidth: number = 500;

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

  $: {
    if (intersecting) {
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
      <div class="w-full flex flex-row items-center">
        <h3 class="font-bold mr-8">พ.ศ. 2491</h3>
        <div class="flex-1">
          <div bind:clientWidth={barWidth} class="w-full h-20">
            <Barchart bind:this={bar2491} {X} data={data2491} {appearance} />
          </div>
          <p>
            <b>167 วัน</b> นับตั้งแต่วันประชุมครั้งแรก (12 กรกฎาคม 2491) จนถึงวันประชุมครั้งสุดท้าย
            (25 ธันวาคม 2491)
          </p>
        </div>
      </div>
    </div>
    <div class="w-full h-20">
      <div class="w-full flex flex-row items-center">
        <h3 class="font-bold mr-8">พ.ศ. 2502</h3>
        <div class="flex-1">
          <div class="w-full h-20">
            <Barchart bind:this={bar2502} {X} data={data2502} {appearance} />
          </div>
          <p>
            <b>6 ปี 10 เดือน 10 วัน</b> นับตั้งแต่วันประชุมครั้งแรก (12 กรกฎาคม 2491)
            จนถึงวันประชุมครั้งสุดท้าย (25 ธันวาคม 2491)
          </p>
        </div>
      </div>
    </div>
    <div class="w-full h-20">
      <div class="w-full flex flex-row items-center">
        <h3 class="font-bold mr-8">พ.ศ. 2539</h3>
        <div class="flex-1">
          <div class="w-full h-20">
            <Barchart bind:this={bar2539} {X} data={data2539} {appearance} />
          </div>
          <p>
            <b>221 วัน</b> นับตั้งแต่วันประชุมครั้งแรก (7 มกราคม 2540) จนถึงวันประชุมครั้งรองสุดท้าย
            (15 สิงหาคม 2540)
          </p>
        </div>
      </div>
    </div>
    <div class="w-full h-20">
      <div class="w-full flex flex-row items-center">
        <h3 class="font-bold mr-8">พ.ศ. 2550</h3>
        <div class="flex-1">
          <div class="w-full h-20">
            <Barchart bind:this={bar2550} {X} data={data2550} {appearance} />
          </div>
          <p>
            <b>180 วัน</b> นับตั้งแต่วันประชุมครั้งแรก (8 มกราคม 2550) จนถึงวันประชุมครั้งที่
            40 (6 กรกฎาคม 2550)
          </p>
        </div>
      </div>
    </div>
  </div>
</IntersectionObserver>
