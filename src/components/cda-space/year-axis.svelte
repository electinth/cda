<script lang="ts">
  import { YEARS } from '../../utils/stats';

  export let selectedYears: string[] = [];
  export let labelElements: NodeListOf<HTMLDivElement>;
  let element: HTMLElement;

  $: labelElements = element ? element.querySelectorAll('div') : null;
</script>

<div class="flex flex-col justify-around py-14" bind:this={element}>
  {#each YEARS as year}
    <div class="year-axis-label font-bold rounded px-2 py-1 text-center">
      <span
        class:opacity-20={selectedYears.length > 0 &&
          !selectedYears.includes(year)}
      >
        พ.ศ. {year}
      </span>
    </div>
  {/each}
</div>
