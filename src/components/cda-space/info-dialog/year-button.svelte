<script lang="ts">
  export let isActive: boolean = false;
</script>

<button
  class="rounded-full px-2 border border-black font-semibold focus:ring ring-gold focus:outline-none {isActive
    ? 'bg-black text-white'
    : 'hover:bg-gold underline'}"
  on:click
>
  พ.ศ. <slot />
</button>
