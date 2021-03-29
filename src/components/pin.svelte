<script context="module" lang="ts">
  export interface ApperanceProps {
    from: ElementAppearance;
    to: ElementAppearance;
  }
</script>

<script lang="ts">
  import anime from 'animejs';
  import type { AnimeParams } from 'animejs';
  import { ElementAppearance } from './barchart.svelte';

  const animationConfig: Record<ElementAppearance, Partial<AnimeParams>> = {
    [ElementAppearance.hide]: {
      opacity: 0,
    },
    [ElementAppearance.fade]: {
      opacity: 0.5,
    },
    [ElementAppearance.show]: {
      opacity: 1,
    },
  };

  export let radius: number = 5,
    height = 20,
    fill = 'black',
    opacity = 1,
    appearance: ApperanceProps = {
      from: ElementAppearance.show,
      to: ElementAppearance.show,
    };

  let ref = null;

  let animation;
  $: {
    if (typeof window !== 'undefined') {
      animation = anime({
        targets: ref,
        ...animationConfig[appearance.to],
        duration: 800,
      });
    }
  }

  function replay() {
    animation.restart();
  }
</script>

<g bind:this={ref} opacity={animationConfig[appearance.from].opacity}>
  <circle r={radius} />
  <line y2={height} stroke={fill} />
</g>
