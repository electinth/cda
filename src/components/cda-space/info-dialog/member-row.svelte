<script lang="ts">
  import type { Color } from 'three';
  import ColorDot from './color-dot.svelte';

  export let color: Color | null = null;
  export let number: number;
  export let name: string;
  export let description: string | null = null;
  export let image: string | null = null;
</script>

<div class="flex flex-row space-x-2">
  {#if image}
    <object
      title={name}
      data={image}
      type="image/png"
      class="rounded-full border border-black w-12 h-12 object-cover my-auto"
    >
      <img src="images/people-default.png" alt={name} />
    </object>
  {/if}
  <div class="flex-1 flex flex-col space-y-1 my-auto">
    <div class="flex flex-row space-x-1">
      <ColorDot {color} {number} />
      <div class="flex-1 font-semibold">{name}</div>
    </div>
    {#if description}
      <p class="text-body2">{description}</p>
    {/if}
  </div>
</div>
