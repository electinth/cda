<script lang="ts">
  export let dark: boolean = false;
</script>

<div
  class="border border-black rounded py-2 px-4 text-h6 font-bold {dark
    ? 'bg-black text-white'
    : 'bg-white'} {$$props.class || ''}"
  on:click
>
  <slot />
</div>
