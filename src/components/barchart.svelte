<script lang="ts">
  import * as d3 from 'd3';

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
    {#each data.slice(1) as d, i}
      <rect
        x={X(data[i].x)}
        width={X(d.x) - X(data[i].x)}
        height={20}
        fill={d.fill}
      />
      <text>{d.x}</text>
    {/each}
  </svg>
</div>
