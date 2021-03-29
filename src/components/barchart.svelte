<script context="module" lang="ts">
  import type { AnimeParams } from 'animejs';

  export interface IData {
    x: number;
    event: string;
    fill: string;
  }

  export enum Status {
    pre_start,
    start,
    drafted,
    done,
    post_done,
  }

  export enum ElementAppearance {
    hide,
    fade,
    show,
  }
  export interface IChartApperance {
    firstPin: ElementAppearance;
    draftPhase: ElementAppearance;
    donePhase: ElementAppearance;
    lastPin: ElementAppearance;
  }

  export const ChartAppearance: Record<Status, IChartApperance> = {
    '0': {
      firstPin: ElementAppearance.show,
      draftPhase: ElementAppearance.fade,
      donePhase: ElementAppearance.fade,
      lastPin: ElementAppearance.fade,
    },
    '1': {
      firstPin: ElementAppearance.show,
      draftPhase: ElementAppearance.hide,
      donePhase: ElementAppearance.hide,
      lastPin: ElementAppearance.hide,
    },
    '2': {
      firstPin: ElementAppearance.fade,
      draftPhase: ElementAppearance.show,
      donePhase: ElementAppearance.fade,
      lastPin: ElementAppearance.fade,
    },
    '3': {
      firstPin: ElementAppearance.show,
      draftPhase: ElementAppearance.fade,
      donePhase: ElementAppearance.fade,
      lastPin: ElementAppearance.fade,
    },
    '4': {
      firstPin: ElementAppearance.show,
      draftPhase: ElementAppearance.fade,
      donePhase: ElementAppearance.fade,
      lastPin: ElementAppearance.fade,
    },
  };
  export type TAnimationConfig = Record<
    ElementAppearance,
    Partial<AnimeParams>
  >;
  export interface ApperanceProps {
    from: ElementAppearance;
    to: ElementAppearance;
  }
</script>

<script lang="ts">
  import * as d3 from 'd3';

  import Pin from './pin.svelte';

  let w = 300,
    h = 150;

  export const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  export let appearance: IChartApperance = {
    firstPin: ElementAppearance.show,
    draftPhase: ElementAppearance.show,
    donePhase: ElementAppearance.show,
    lastPin: ElementAppearance.show,
  };

  export let data: IData[] = [{ x: 0, event: 'start', fill: 'black' }];

  let accumulator = 0;
  $: stackdata = data.reduce<IData[]>((acc, cur, idx) => {
    if (idx === 0) {
      return acc;
    }

    return [
      ...acc,
      {
        ...cur,
        x: (accumulator += cur.x),
      },
    ];
  }, []);

  export let X = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.x)])
    .range([margin.left, w - margin.right]);

  let firstPinRef: Pin, lastPinRef: Pin;
  export function replay() {
    firstPinRef.replay();
    lastPinRef.replay();
  }
</script>

<div class="w-full h-full" bind:clientHeight={h} bind:clientWidth={w}>
  <svg class="w-full h-full">
    <g transform={`translate(${margin.left * 0.5}, ${margin.top * 0.5})`}>
      <Pin
        bind:this={firstPinRef}
        radius={5}
        height={h - margin.top - margin.bottom + margin.top * 0.5}
        fill={'black'}
      />
    </g>
    {#each stackdata as d, i}
      <rect
        x={X(data[i].x)}
        y={margin.top}
        width={X(d.x) - X(data[i].x)}
        height={h - margin.top - margin.bottom}
        fill={d.fill}
      />
    {/each}
    <g
      transform={`translate(${
        X(data.reduce((acc, cur) => (acc += cur.x), 0)) + margin.right * 0.5
      }, ${margin.top * 0.5})`}
    >
      <Pin
        bind:this={lastPinRef}
        radius={5}
        height={h - margin.top - margin.bottom + margin.top * 0.5}
        fill={'black'}
      />
    </g>
  </svg>
</div>
