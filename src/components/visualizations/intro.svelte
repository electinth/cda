<script lang="ts">
  import IntersectionObserver from 'svelte-intersection-observer';
  import anime from 'animejs/lib/anime.es.js';

  import CdaSpace from '../cda-space/cda-space.svelte';
  import { CDA_COUNTS, YEARS } from '../../utils/stats';
  import type { SpherePlane } from '../../utils/three/sphere-plane';
  import type { Sphere } from '../../utils/three/sphere';

  const data = YEARS.map((year) => {
    return new Array(CDA_COUNTS[year]).fill({});
  });

  const getAnimationStep = (index: number) => ({
    delay: 500 + index * 1500,
    duration: 2000,
  });

  let nodes: Sphere<{}>[];
  let spherePlanes: SpherePlane[];
  let container: HTMLElement;
  let intersecting: boolean = false;
  let isTransitionPlayed = false;
  let yearAxisLabels: NodeListOf<HTMLElement>;

  $: {
    if (nodes && container) {
      nodes.forEach((node: Sphere<{}>) => {
        node.material.transparent = true;
        node.material.opacity = 0;
      });

      yearAxisLabels = container.querySelectorAll('.year-axis-label');

      yearAxisLabels.forEach((label) => {
        label.style.opacity = '0';
      });
    }
  }

  $: {
    if (intersecting && !isTransitionPlayed) {
      spherePlanes.forEach(({ children }, index) => {
        anime({
          targets: [
            ...children.map(({ material }: Sphere<{}>) => material),
            yearAxisLabels[index],
          ],
          opacity: [0, 1],
          easing: 'linear',
          ...getAnimationStep(index),
        });

        anime({
          targets: children.map(({ position }: Sphere<{}>) => position),
          x: [-100, 0],
          easing: 'easeOutCubic',
          ...getAnimationStep(index),
        });
      });

      isTransitionPlayed = true;
    }
  }
</script>

<IntersectionObserver element={container} bind:intersecting>
  <div bind:this={container}>
    <CdaSpace {data} bind:nodes bind:spherePlanes />
  </div>
</IntersectionObserver>
