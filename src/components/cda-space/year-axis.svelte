<script lang="ts" context="module">
  export const YEARS = ['2491', '2502', '2539', '2550'];
</script>

<script lang="ts">
  export let selectedYears: string[] = [];
</script>

<div class="flex flex-col justify-around py-32">
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
