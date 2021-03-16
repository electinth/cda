<script lang="ts">
  const TOP_OFFSET = 16;

  export let x: number;
  export let y: number;
  export let label: string;
</script>

<div
  class="absolute transform -translate-x-1/2 -translate-y-full p-2 rounded shadow bg-white"
  style="top: {y - TOP_OFFSET}px; left: {x}px;"
>
  {label}
</div>
