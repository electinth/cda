<script lang="ts">
  import type { Color } from 'three';

  export let color: Color | null;
  export let number: number | string = '';
</script>

<div
  class="flex justify-center text-center w-4 h-4 rounded-full text-white text-xs m-1 {!color &&
    'border-black border'}"
  style="background-color: #{color ? color.getHexString() : 'ffffff'};"
>
  <span class="m-auto text-body2">{number}</span>
</div>
