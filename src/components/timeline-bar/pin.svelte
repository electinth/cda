<script lang="ts">
  import { ElementAppearance } from './animationConfig';
  import type { ApperanceProps, TAnimationConfig } from './animationConfig';
  import { tweened } from 'svelte/motion';

  let animationConfig: TAnimationConfig = {
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
    },
    delay: number,
    duration: number;

  let ref = null;

  $: t = tweened(
    { ...animationConfig[appearance.from] },
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

<g bind:this={ref} opacity={$t.opacity}>
  <circle r={radius} />
  <line y2={height} stroke={fill} />
</g>
