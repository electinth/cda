<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import type { Color } from 'three';
  import ColorDot from './color-dot.svelte';
  import GroupBox from './group-box.svelte';
  import YearButton from './year-button.svelte';

  export let description: string;
  export let color: Color;
  export let years: string[];
  export let selectedYear: string;

  const dispatch = createEventDispatcher();
</script>

<GroupBox>
  <div class="flex flex-row space-x-2">
    <ColorDot color="#{color.getHexString()}" />
    <div class="flex flex-col space-y-1">
      <div>{description}</div>
      <div class="flex flex-row space-x-1">
        {#each years as year}
          <YearButton
            on:click={() => dispatch('select', year)}
            isActive={year === selectedYear}>{year}</YearButton
          >
        {/each}
      </div>
    </div>
  </div>
</GroupBox>
