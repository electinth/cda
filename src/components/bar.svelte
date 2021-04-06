<script lang="ts">
  import { ElementAppearance } from './animationConfig';
  import type { ApperanceProps, TAnimationConfig } from './animationConfig';
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
    },
    duration: number,
    delay: number;

  let ref: SVGRectElement;
  let animation: AnimeInstance;
  let animationConfig: TAnimationConfig;
  $: {
    if (typeof window !== 'undefined') {
      animation = anime({
        targets: ref,
        easing: 'linear',
        ...animationConfig[appearance.to],
        duration,
        delay,
      });
    }
  }
  export function replay() {
    animation.restart();
  }

  $: animationConfig = {
    [ElementAppearance.hide]: {
      opacity: 0,
      width: 0,
    },
    [ElementAppearance.fade]: {
      opacity: 0.5,
      width,
    },
    [ElementAppearance.show]: {
      opacity: 1,
      width,
    },
  };
</script>

<g transform={`translate(${x}, ${y})`}>
  <text>
    from: {animationConfig[appearance.from].opacity}
    {appearance.from}
    to: {animationConfig[appearance.to].opacity}
    {appearance.to}
  </text>
</g>
<rect
  bind:this={ref}
  {x}
  {y}
  opacity={animationConfig[appearance.from].opacity}
  width={animationConfig[appearance.from].width}
  {height}
  {fill}
/>
