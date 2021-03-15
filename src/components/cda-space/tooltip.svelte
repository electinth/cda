<script lang="ts">
  import type { ScreenCoord } from './index.svelte';

  const TOP_OFFSET = 16;

  export let offset: ScreenCoord;
  export let data: unknown;
</script>

<div
  class="absolute transform -translate-x-1/2 -translate-y-full p-2 rounded shadow bg-white"
  style="top: {offset.y - TOP_OFFSET}px; left: {offset.x}px;"
>
  {JSON.stringify(data)}
</div>
