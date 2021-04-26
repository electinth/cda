<script lang="ts">
  import { slide } from 'svelte/transition';
</script>

<div
  style={$$props.style}
  class="border border-gray-400 bg-white rounded p-2 {$$props.class || ''}"
  transition:slide
>
  <slot />
</div>
