<script lang="ts">
  import { onMount } from 'svelte';
  import { Color, Vector2 } from 'three';
  import type { Sphere } from '../../utils/three/sphere';
  import { SpherePlane } from '../../utils/three/sphere-plane';
  import { createStage } from '../../utils/three/stage';
  import Marker from './marker.svelte';
  import Tooltip from './tooltip.svelte';

  export let selectedNodes: Sphere[] = [];

  const PLANE_DISTANCE = 200;
  const CDA_IN_EACH_YEAR = [40, 240, 99, 100];

  let container: HTMLElement,
    mouse = new Vector2(1, 1),
    hoveredSphere: Sphere = null;

  const {
    scene,
    initRenderer,
    renderScene,
    updateCanvasSize,
    getMouseIntersections,
    getObjectCanvasOffset,
  } = createStage();

  const dataSphereColors = [
    new Color('#ff5555'),
    new Color('#55ff55'),
    new Color('#5555ff'),
  ];

  const spherePlanes = CDA_IN_EACH_YEAR.map((cdaAmount, yearIndex) => {
    const spherePlane = new SpherePlane(
      new Array(cdaAmount)
        .fill({
          accentColor: new Color('#ff5555'),
          group: yearIndex % 2 === 0 ? `${yearIndex}` : null,
        })
        .map((sphere, sphereIndex) => {
          const group = Math.floor(Math.random() * 3);

          return {
            ...sphere,
            ...(yearIndex % 2 !== 0 && sphereIndex % 10 === 0
              ? {
                  primaryColor: dataSphereColors[group],
                  accentColor: dataSphereColors[group],
                  data: {
                    number: group,
                  },
                  group,
                }
              : {}),
          };
        })
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

    const { offsetX, offsetY } = event;

    mouse.x = (offsetX / container.clientWidth) * 2 - 1;
    mouse.y = -(offsetY / container.clientHeight) * 2 + 1;
  };

  const getAllSphereInHoveredSphereGroup = () =>
    hoveredSphere.group
      ? spheres.filter((sphere) => sphere.isInTheSameGroupWith(hoveredSphere))
      : [hoveredSphere];

  const onContainerClick = () => {
    selectedNodes.forEach((sphere) => sphere.toNormalState());

    if (hoveredSphere?.data) {
      selectedNodes = getAllSphereInHoveredSphereGroup();
      selectedNodes.forEach((sphere) => sphere.toActiveState());
    } else {
      selectedNodes = [];
    }
  };

  const updateNonSelectedSpheresState = (
    action: 'toNormalState' | 'toActiveState'
  ) => {
    getAllSphereInHoveredSphereGroup()
      .filter(({ uuid }) => !selectedNodes.some((node) => node.uuid === uuid))
      .forEach((sphere) => sphere[action]());
  };

  onMount(() => {
    initRenderer(container);

    window.addEventListener('resize', updateCanvasSize);

    const onEachFrame = () => {
      requestAnimationFrame(onEachFrame);

      const [intersection] = getMouseIntersections(mouse, spheres);

      if (
        hoveredSphere &&
        (!intersection || intersection.object.uuid !== hoveredSphere.uuid)
      ) {
        updateNonSelectedSpheresState('toNormalState');
        hoveredSphere = null;
      }

      if (
        intersection &&
        intersection.object.type === 'SphereMesh' &&
        intersection.object.uuid !== hoveredSphere?.uuid
      ) {
        hoveredSphere = intersection.object as Sphere;
        updateNonSelectedSpheresState('toActiveState');
      }

      if (selectedNodes.length === 0 && !hoveredSphere) {
        spherePlanes.forEach((plane) => plane.spin());
      }

      renderScene();
    };

    onEachFrame();
  });
</script>

<div
  class="relative w-full h-full flex-1"
  bind:this={container}
  on:mousemove={updateMousePosition}
  on:click={onContainerClick}
>
  {#if hoveredSphere && hoveredSphere.data}
    <Tooltip
      {...getObjectCanvasOffset(hoveredSphere)}
      label={JSON.stringify(hoveredSphere.data)}
    />
  {/if}
  {#each selectedNodes as node}
    <Marker {...getObjectCanvasOffset(node)} number={node.data['number']} />
  {/each}
</div>
