<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import type { Color } from 'three';
  import ColorDot from './color-dot.svelte';
  import GroupBox from './group-box.svelte';
  import YearButton from './year-button.svelte';

  export let description: string;
  export let color: Color;
  export let years: string[];
  export let selectedYears: string[];

  const dispatch = createEventDispatcher();
</script>

<GroupBox>
  <div class="flex flex-row space-x-1">
    <ColorDot {color} />
    <div class="flex flex-col space-y-1">
      <div class="font-semibold">{description}</div>
      <div class="flex flex-row space-x-1">
        {#each years as year}
          <YearButton
            on:click={() => dispatch('select', year)}
            isActive={selectedYears && selectedYears.includes(year)}
            >{year}</YearButton
          >
        {/each}
      </div>
    </div>
  </div>
</GroupBox>
