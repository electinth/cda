<script lang="ts">
  import type { ScreenCoord } from './index.svelte';

  export let data: unknown;
  export let offset: ScreenCoord;
</script>

<div
  class="absolute transform -translate-x-1/2 -translate-y-1/2 text-white"
  style="top: {offset.y}px; left: {offset.x}px;"
>
  {data['number']}
</div>

<style>
  div {
    pointer-events: none;
    user-select: none;
    cursor: none;
  }
</style>
