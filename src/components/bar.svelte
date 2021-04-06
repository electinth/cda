<script lang="ts">
  import { ElementAppearance } from './animationConfig';
  import type { ApperanceProps, TAnimationConfig } from './animationConfig';
  import { tweened } from 'svelte/motion';

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
  let animationConfig: TAnimationConfig = {
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

  $: t = tweened(
    { ...animationConfig[appearance.to] },
    {
      delay,
      duration,
    }
  );
  export function replay() {
    t.set({ ...animationConfig[appearance.from] }, { duration: 0 });
    $t = { ...animationConfig[appearance.to] };
  }
</script>

<g transform={`translate(${x}, ${y})`}>
  <text>
    from: {animationConfig[appearance.from].width}
    to: {animationConfig[appearance.to].width}
  </text>
</g>
<rect
  bind:this={ref}
  {x}
  {y}
  opacity={$t.opacity}
  width={$t.width}
  {height}
  {fill}
/>
