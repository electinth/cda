<script lang="ts">
  export let x: number;
  export let y: number;
  export let number: string;
</script>

<div
  class="absolute transform hidden md:block -translate-x-1/2 -translate-y-1/2 text-white"
  style="top: {y}px; left: {x}px;"
>
  {number}
</div>

<style>
  div {
    pointer-events: none;
    user-select: none;
    cursor: none;
  }
</style>
