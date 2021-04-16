<script lang="ts">
  import type { Color } from 'three';

  export let color: Color;
  export let number: number | string = '';
</script>

<div
  class="flex justify-center text-center w-4 h-4 rounded-full text-white text-xs m-1"
  style="background-color: #{color.getHexString()};"
>
  <span class="m-auto text-body2">{number}</span>
</div>
