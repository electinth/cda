<script lang="ts">
  const TOP_OFFSET = 16;

  export let x: number;
  export let y: number;
  export let alt: string;
  export let image: string;
</script>

<object
  title={alt}
  data={image}
  style="top: {y - TOP_OFFSET}px; left: {x}px;"
  type="image/png"
  class="absolute transform -translate-x-1/2 -translate-y-full p-1 rounded-full shadow object-cover bg-white"
>
  <img src="images/people-default.png" {alt} />
</object>
