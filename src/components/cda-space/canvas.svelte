<script lang="ts" context="module">
  import type { CartesianCoord } from './tooltip.svelte';
  export interface NodeEventDetail {
    pointerOffset: CartesianCoord;
    data: unknown;
  }
</script>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { Color, Vector2 } from 'three';
  import type { Sphere } from '../../utils/three/sphere';
  import { SpherePlane } from '../../utils/three/sphere-plane';
  import { createStage } from '../../utils/three/stage';

  const PLANE_DISTANCE = 200;
  const CDA_IN_EACH_YEAR = [40, 240, 99, 100];

  let container: HTMLElement,
    pointerOffset = { x: 0, y: 0 },
    mouse = new Vector2(1, 1),
    hoveredSphere: Sphere = null;

  $: {
    if (container) {
      mouse.x = (pointerOffset.x / container.clientWidth) * 2 - 1;
      mouse.y = -(pointerOffset.y / container.clientHeight) * 2 + 1;
    }
  }

  const dispatch = createEventDispatcher();

  const {
    scene,
    initRenderer,
    renderScene,
    updateCanvasSize,
    getMouseIntersections,
  } = createStage();

  const spherePlanes = CDA_IN_EACH_YEAR.map((cdaAmount, yearIndex) => {
    const spherePlane = new SpherePlane(
      new Array(cdaAmount)
        .fill({
          accentColor: new Color('#ff5555'),
          group: yearIndex % 2 === 0 ? `${yearIndex}` : null,
        })
        .map((sphere, sphereIndex) => ({
          ...sphere,
          ...(yearIndex % 2 !== 0 && sphereIndex % 10 === 0
            ? {
                primaryColor: new Color('#ff5555'),
                data: 'DATA',
              }
            : {}),
        }))
    );
    spherePlane.position.x =
      PLANE_DISTANCE * ((CDA_IN_EACH_YEAR.length - 1) / 2 - yearIndex);

    return spherePlane;
  });

  scene.add(...spherePlanes);

  const spheres: Sphere[] = spherePlanes.reduce(
    (flatChildren, plane) => [...flatChildren, ...plane.children],
    []
  );

  const updateMousePosition = (event: MouseEvent) => {
    event.preventDefault();

    pointerOffset = {
      x: event.offsetX,
      y: event.offsetY,
    };
  };

  const parseNodeEventDetail = (): NodeEventDetail => ({
    pointerOffset,
    data: hoveredSphere.data,
  });

  onMount(() => {
    let isSpinning = true;

    initRenderer(container);

    window.addEventListener('resize', () => updateCanvasSize(container));

    const updateSpheresState = (action: 'toNormalState' | 'toHoverState') => {
      if (hoveredSphere.group) {
        spheres.forEach(
          (sphere) =>
            sphere.isInTheSameGroupWith(hoveredSphere) && sphere[action]()
        );
      } else {
        hoveredSphere[action]();
      }
    };

    const onEachFrame = () => {
      requestAnimationFrame(onEachFrame);

      const [intersection] = getMouseIntersections(mouse, spheres);

      if (
        hoveredSphere &&
        (!intersection || intersection.object.uuid !== hoveredSphere.uuid)
      ) {
        updateSpheresState('toNormalState');
        hoveredSphere = null;
        isSpinning = true;

        dispatch('nodemouseleave');
      }

      if (
        intersection &&
        intersection.object.type === 'SphereMesh' &&
        intersection.object.uuid !== hoveredSphere?.uuid
      ) {
        isSpinning = false;
        hoveredSphere = intersection.object as Sphere;
        updateSpheresState('toHoverState');

        dispatch('nodemouseover', parseNodeEventDetail());
      }

      if (isSpinning) {
        spherePlanes.forEach((plane) => plane.spin());
      }

      renderScene();
    };

    onEachFrame();
  });
</script>

<div
  class="w-full h-full flex-1"
  bind:this={container}
  on:mousemove={updateMousePosition}
  on:click={() =>
    hoveredSphere && dispatch('nodeclick', parseNodeEventDetail())}
/>
