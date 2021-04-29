<script lang="ts">
  import type { Color } from 'three';

  export let color: Color | null;
  export let number: number | string = '';

  $: fontSize = number >= 100 ? 8 : number >= 10 ? 10 : 12;
</script>

<div
  class="flex justify-center text-center w-4 h-4 rounded-full text-white text-xs m-1 {!color &&
    'border-black border'}"
  style="background-color: #{color ? color.getHexString() : 'ffffff'};"
>
  <span
    class="m-auto leading-none font-semibold"
    style="font-size: {fontSize}px;">{number}</span
  >
</div>
