<script lang="ts">
  import * as d3 from 'd3';

  import { ChartAppearance, Status } from '../components/animationConfig';
  import type {
    IData,
    ChartApperanceProps,
  } from '../components/animationConfig';
  import Bargroup from '../components/bargroup.svelte';

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  const data2491 = [
    { x: 0, event: 'start', fill: 'black' },
    { x: 30, event: 'drafted', fill: '#0066FF' },
    { x: 137, event: 'done', fill: '#FF8A00' },
  ];
  const data2502 = [
    { x: 0, event: 'start', fill: 'black' },
    { x: 2000, event: 'drafted', fill: '#0066FF' },
    { x: 1005, event: 'done', fill: '#FF8A00' },
  ];
  const data2539 = [
    { x: 0, event: 'start', fill: 'black' },
    { x: 50, event: 'drafted', fill: '#0066FF' },
    { x: 171, event: 'done', fill: '#FF8A00' },
  ];
  const data2550 = [
    { x: 0, event: 'start', fill: 'black' },
    { x: 40, event: 'drafted', fill: '#0066FF' },
    { x: 140, event: 'done', fill: '#FF8A00' },
  ];
  function accumulateMax(data: IData[]) {
    return data.reduce((acc, cur) => (acc += cur.x), 0);
  }
  const globalMax = d3.max(
    [data2491, data2502, data2539, data2550].map(accumulateMax)
  );

  let w = 300;
  $: X = d3
    .scaleLinear()
    .domain([0, globalMax])
    .range([margin.left, w - margin.right]);

  const ChartsProps: Partial<Record<Status, ChartApperanceProps>> = {
    [Status.pre_start]: {
      from: ChartAppearance[Status.pre_start],
      to: ChartAppearance[Status.start],
    },
    [Status.start]: {
      from: ChartAppearance[Status.start],
      to: ChartAppearance[Status.drafted],
    },
    [Status.drafted]: {
      from: ChartAppearance[Status.drafted],
      to: ChartAppearance[Status.done],
    },
    [Status.done]: {
      from: ChartAppearance[Status.done],
      to: ChartAppearance[Status.post_done],
    },
  };
</script>

{#each Object.entries(ChartsProps) as [, appearance]}
  <div class="w-screen h-screen p-28">
    <Bargroup
      bind:barWidth={w}
      {appearance}
      {X}
      {data2491}
      {data2502}
      {data2539}
      {data2550}
    />
  </div>
{/each}
