<script lang="ts">
  const TOP_OFFSET = 16;

  export let x: number;
  export let y: number;
  export let alt: string;
  export let image: string;
</script>

<img
  class="absolute transform -translate-x-1/2 -translate-y-full p-1 rounded-full shadow object-cover bg-white"
  style="top: {y - TOP_OFFSET}px; left: {x}px;"
  src={image}
  {alt}
/>
