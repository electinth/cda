<script lang="ts" context="module">
  const TOP_OFFSET = 16;
  export interface CartesianCoord {
    x: number;
    y: number;
  }

  export interface TooltipProps {
    offset: CartesianCoord;
    label: string;
  }
</script>

<script lang="ts">
  export let offset: CartesianCoord;
  export let label: string;
</script>

<div
  class="absolute transform -translate-x-1/2 -translate-y-full p-2 rounded shadow bg-white"
  style="top: {offset.y - TOP_OFFSET}px; left: {offset.x}px;"
>
  {label}
</div>
