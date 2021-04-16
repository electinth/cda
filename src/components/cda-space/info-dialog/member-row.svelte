<script lang="ts">
  import type { Color } from 'three';
  import ColorDot from './color-dot.svelte';

  export let color: Color;
  export let number: number;
  export let name: string;
</script>

<div class="flex flex-row space-x-1">
  <ColorDot {color} {number} />
  <div class="flex-1">{name}</div>
</div>
