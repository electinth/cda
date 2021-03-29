<script lang="ts">
  import anime from 'animejs';
  import { ElementAppearance } from './barchart.svelte';
  import type { ApperanceProps, TAnimationConfig } from './barchart.svelte';

  const animationConfig: TAnimationConfig = {
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
    appearance: ApperanceProps = {
      from: ElementAppearance.hide,
      to: ElementAppearance.show,
    };

  let ref = null;

  let animation;
  $: {
    if (typeof window !== 'undefined') {
      animation = anime({
        targets: ref,
        ease: 'linear',
        ...animationConfig[appearance.to],
        duration: 2000,
      });
    }
  }

  export function replay() {
    animation.restart();
  }
</script>

<g bind:this={ref} opacity={animationConfig[appearance.from].opacity}>
  <circle r={radius} />
  <line y2={height} stroke={fill} />
</g>
