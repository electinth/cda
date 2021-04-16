<script lang="ts">
  import type { Color } from 'three';
  import ColorDot from './color-dot.svelte';

  export let label: string;
  export let amount: number;
  export let color: Color;
  export let isLarge: boolean = false;
</script>

<div
  class="flex flex-row space-x-1 {$$props.class || ''}"
  class:font-semibold={isLarge}
>
  {#if color}
    <ColorDot {color} />
  {/if}
  <div>{label}</div>
  <div class="flex-1 text-right" class:text-h6={isLarge}>
    {amount}
  </div>
  <div>คน</div>
</div>
