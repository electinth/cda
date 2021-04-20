<script lang="ts">
  import { YEARS } from '../../utils/stats';

  export let selectedYears: string[] = [];
</script>

<div class="flex flex-col justify-around py-8">
  {#each YEARS as year}
    <div
      class="font-bold rounded px-2 py-1 text-center {selectedYears.length === 0
        ? ''
        : selectedYears.includes(year)
        ? ' bg-black text-white'
        : 'opacity-20'}"
    >
      พ.ศ. {year}
    </div>
  {/each}
</div>
