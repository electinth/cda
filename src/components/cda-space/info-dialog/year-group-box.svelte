<script lang="ts">
  import type { Color } from 'three';
  import ColorDot from './color-dot.svelte';
  import YearButton from './year-button.svelte';

  export let description: string;
  export let color: Color;
  export let years: string[];
</script>

<div
  class="flex flex-row border border-gray-600 bg-white rounded py-2 px-4 space-x-2"
>
  <ColorDot color="#{color.getHexString()}" />
  <div class="flex flex-col space-y-1">
    <div>{description}</div>
    <div class="flex flex-row space-x-1">
      {#each years as year}
        <YearButton>{year}</YearButton>
      {/each}
    </div>
  </div>
</div>
