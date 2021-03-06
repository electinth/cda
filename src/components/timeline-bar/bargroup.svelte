<script context="module" lang="ts">
  export interface IBargroupProps {
    appearance: ChartApperanceProps;
    description: {
      topicNumber: number;
      topic: string;
      description: string;
      texts: string[];
      highlights: string[];
    };
  }
</script>

<script lang="ts">
  import IntersectionObserver from 'svelte-intersection-observer';
  import { YEARS } from '../../utils/stats';
  import type { ChartApperanceProps, IData } from './animationConfig';
  import Barchart from './barchart.svelte';
  import Header from '../header.svelte';
  import ReplayButton from '../replay-button.svelte';
  import VizContainer from '../viz-container.svelte';

  export let props: IBargroupProps;

  let { appearance } = props;

  export let X: d3.ScaleLinear<number, number, never>, dataList: IData[][];
  export let barWidth: number = 500;

  let barcharts: Barchart[] = dataList.map(() => null);

  function replay() {
    barcharts.forEach((barchart) => barchart.replay());
  }

  let ref: HTMLElement;
  let intersecting: boolean = false;

  $: {
    if (intersecting) {
      replay();
    }
  }
</script>

<Header number={props.description.topicNumber}>
  <span slot="topic">{props.description.topic}</span>
  <span slot="description">{props.description.description}</span>
</Header>
<IntersectionObserver element={ref} bind:intersecting threshold={0.5}>
  <VizContainer>
    <div class="w-full flex flex-row justify-end">
      <ReplayButton on:click={replay} />
    </div>
    <div
      bind:this={ref}
      class="flex-1 w-full flex flex-col items-center space-y-8"
    >
      {#each dataList as data, index}
        <div class="w-full flex flex-row items-center">
          <div class="w-28 hidden md:flex">
            <h3 class="font-semibold px-2 border border-black rounded">
              พ.ศ. {YEARS[index]}
            </h3>
          </div>

          <div class="flex-1 flex flex-col">
            <div bind:clientWidth={barWidth} class="w-full h-20">
              <Barchart bind:this={barcharts[index]} {X} {data} {appearance} />
            </div>
            <div>
              <div class="mr-auto font-bold md:inline mb-2">
                <span class="md:hidden text-white bg-black rounded px-1 mr-1">
                  พ.ศ. {YEARS[index]}
                </span>
                {props.description.highlights[index]}
              </div>
              {props.description.texts[index]}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </VizContainer>
</IntersectionObserver>
