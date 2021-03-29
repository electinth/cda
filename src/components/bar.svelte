<script lang="ts">
  import { ElementAppearance } from './barchart.svelte';
  import type { ApperanceProps, TAnimationConfig } from './barchart.svelte';
  import anime from 'animejs';
  import type { AnimeInstance } from 'animejs';

  export let x: number,
    y: number,
    width: number,
    height: number,
    fill: string,
    appearance: ApperanceProps = {
      from: ElementAppearance.hide,
      to: ElementAppearance.show,
    };

  let ref: SVGRectElement;
  let animation: AnimeInstance;
  let animationConfig: TAnimationConfig;
  $: {
    if (typeof window !== 'undefined') {
      animation = anime({
        targets: ref,
        easing: 'linear',
        ...animationConfig[appearance.to],
        duration: 2000,
      });
    }
  }
  export function replay() {
    animation.restart();
  }

  $: animationConfig = {
    [ElementAppearance.hide]: {
      width: 0,
    },
    [ElementAppearance.fade]: {
      width,
    },
    [ElementAppearance.show]: {
      width,
    },
  };
</script>

<rect
  bind:this={ref}
  {x}
  {y}
  width={animationConfig[appearance.from].width}
  {height}
  {fill}
/>
