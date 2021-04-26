<script lang="ts">
  export let x: number;
  export let y: number;
  export let number: string;
</script>

<div
  class="absolute transform -translate-x-1/2 md:-translate-y-1/2 md:text-white"
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
