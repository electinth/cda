<script lang="ts">
  import { YEARS } from '../../utils/stats';

  export let selectedYears: string[] = [];
</script>

<div class="flex flex-col justify-around py-10">
  {#each YEARS as year}
    <div
      class="year-axis-label font-bold rounded px-2 py-1 text-center {selectedYears.length ===
      0
        ? ''
        : selectedYears.includes(year)
        ? ' bg-black text-white'
        : 'opacity-20'}"
    >
      พ.ศ. {year}
    </div>
  {/each}
</div>
