<script lang="ts">
  import * as d3 from 'd3';
  import Pin from './pin.svelte';

  interface IData {
    x: number;
    event: string;
    fill: string;
  }

  let w = 300,
    h = 150;

  export const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  export let data: IData[] = [];
  $: X = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.x)])
    .range([margin.left, w - margin.right]);
</script>

<div class="w-full h-full" bind:clientHeight={h} bind:clientWidth={w}>
  <svg class="w-full h-full">
    <g transform={`translate(${margin.left * 0.5}, ${margin.top * 0.5})`}>
      <Pin
        radius={5}
        height={h - margin.top - margin.bottom + margin.top * 0.5}
        fill={'black'}
      />
    </g>
    {#each data.slice(1) as d, i}
      <rect
        x={X(data[i].x)}
        y={margin.top}
        width={X(d.x) - X(data[i].x)}
        height={h - margin.top - margin.bottom}
        fill={d.fill}
      />
      <text>{d.x}</text>
    {/each}
    <g
      transform={`translate(${
        X(data[data.length - 1].x) + margin.right * 0.5
      }, ${margin.top * 0.5})`}
    >
      <Pin
        radius={5}
        height={h - margin.top - margin.bottom + margin.top * 0.5}
        fill={'black'}
      />
    </g>
  </svg>
</div>
