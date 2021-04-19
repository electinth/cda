<script lang="ts">
  import type { Color } from 'three';
  import ColorDot from './color-dot.svelte';

  export let color: Color;
  export let number: number;
  export let name: string;
  export let description: string;
</script>

<div class="flex flex-col space-y-1">
  <div class="flex flex-row space-x-1">
    <ColorDot {color} {number} />
    <div class="flex-1 font-semibold">{name}</div>
  </div>
  {#if description}
    <p class="text-body2">{description}</p>
  {/if}
</div>
