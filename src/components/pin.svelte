<script lang="ts">
  import anime from 'animejs/lib/anime.es';
  import { onMount } from 'svelte';

  export let radius: number = 5,
    height = 20,
    fill = 'black',
    opacity = 1;

  let ref = null;

  let animation;
  onMount(() => {
    if (typeof window !== undefined) {
      animation = anime({
        targets: ref,
        opacity: 0.5,
        duration: 800,
      });
    }
  });

  function replay() {
    animation.restart();
  }
</script>

<rect
  width={20}
  height={20}
  color="gainsboro"
  cursor="pointer"
  on:click={replay}
/>
<g bind:this={ref} {opacity}>
  <circle r={radius} />
  <line y2={height} stroke={fill} />
</g>
