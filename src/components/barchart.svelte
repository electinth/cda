<script lang="ts">
  import * as d3 from 'd3';
  import { DURATION, ElementAppearance } from './animationConfig';
  import type { ChartApperanceProps, IData } from './animationConfig';
  import Bar from './bar.svelte';

  import Pin from './pin.svelte';

  let w = 700,
    h = 80;

  export const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  export let appearance: ChartApperanceProps = {
    from: {
      firstPin: ElementAppearance.show,
      draftPhase: ElementAppearance.show,
      donePhase: ElementAppearance.show,
      lastPin: ElementAppearance.show,
    },
    to: {
      firstPin: ElementAppearance.show,
      draftPhase: ElementAppearance.show,
      donePhase: ElementAppearance.show,
      lastPin: ElementAppearance.show,
    },
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

  let firstPinRef: Pin,
    lastPinRef: Pin,
    BarRefs: Bar[] = [];
  export function replay() {
    firstPinRef.replay();
    lastPinRef.replay();
    BarRefs.forEach((barRef) => barRef.replay());
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
        appearance={{
          from: appearance.from.firstPin,
          to: appearance.to.firstPin,
        }}
        duration={DURATION}
        delay={0}
      />
    </g>
    {#each stackdata as d, i}
      <Bar
        bind:this={BarRefs[i]}
        x={X(data[i].x)}
        y={margin.top}
        width={X(d.x) - X(data[i].x)}
        height={h - margin.top - margin.bottom}
        fill={d.fill}
        duration={DURATION}
        delay={DURATION * (i + 1)}
        appearance={{
          from: i ? appearance.from.donePhase : appearance.from.draftPhase,
          to: i ? appearance.to.donePhase : appearance.to.draftPhase,
        }}
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
        appearance={{
          from: appearance.from.lastPin,
          to: appearance.to.lastPin,
        }}
        duration={DURATION}
        delay={DURATION * 3}
      />
    </g>
  </svg>
</div>
