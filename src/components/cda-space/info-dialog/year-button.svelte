<script lang="ts">
  export let isActive: boolean = false;
</script>

<button
  class="rounded-full px-2 border border-black text-body2 {isActive
    ? 'bg-black text-white'
    : ''}"
  on:click
>
  <slot />
</button>
