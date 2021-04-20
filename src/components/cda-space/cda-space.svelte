<script lang="ts">
  import { onMount } from 'svelte';
  import { Vector2 } from 'three';
  import { YEARS } from '../../utils/stats';
  import type {
    Sphere,
    SphereConstructorProps,
  } from '../../utils/three/sphere';
  import { SpherePlane } from '../../utils/three/sphere-plane';
  import { createStage } from '../../utils/three/stage';
  import Marker from './marker.svelte';
  import Tooltip from './tooltip.svelte';
  import YearAxis from './year-axis.svelte';

  const PLANE_DISTANCE = 200;

  export let data: SphereConstructorProps<unknown>[][];
  export let nodes: Sphere<unknown>[] = [];
  export let selectedNodes: Sphere<unknown>[] = [];
  export let selectedYears: string[] = [];
  export let isFreeze: boolean = false;

  let container: HTMLElement,
    mouse = new Vector2(1, 1),
    hoveredSphere: Sphere<unknown> = null;

  const {
    scene,
    initRenderer,
    renderScene,
    updateCanvasSize,
    getMouseIntersections,
    getObjectCanvasOffset,
  } = createStage();

  const spherePlanes = data.map((planeData) => new SpherePlane(planeData));

  spherePlanes.forEach((spherePlane, yearIndex) => {
    spherePlane.position.x =
      PLANE_DISTANCE * ((data.length - 1) / 2 - yearIndex);
  });

  scene.add(...spherePlanes);

  nodes = spherePlanes.reduce(
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
      ? nodes.filter((sphere) => sphere.isInTheSameGroupWith(hoveredSphere))
      : [hoveredSphere];

  const onContainerClick = () => {
    selectedNodes = hoveredSphere?.isSelectable
      ? getAllSphereInHoveredSphereGroup()
      : [];
  };

  $: {
    updateSpheresAppearance(selectedNodes);
  }

  const updateSpheresAppearance = (selectedNodes: Sphere<unknown>[]) => {
    const selectedYearIndexes =
      selectedNodes.length === 0
        ? []
        : spherePlanes.reduce(
            (list, { children }, planeIndex) =>
              children.some((sphere: Sphere<unknown>) =>
                selectedNodes.some((node) => sphere.is(node))
              )
                ? [...list, planeIndex]
                : list,

            []
          );

    selectedYears = selectedYearIndexes.map((yearIndex) => YEARS[yearIndex]);

    spherePlanes.forEach(({ children }, planeIndex) => {
      const isThisYearSelected = selectedYearIndexes.includes(planeIndex);

      children.forEach((sphere: Sphere<unknown>) => {
        if (selectedNodes.some((node) => sphere.is(node))) {
          sphere.toState('selected');
        } else if (
          sphere.is(hoveredSphere) ||
          (!sphere.isIndividual && sphere.isInTheSameGroupWith(hoveredSphere))
        ) {
          sphere.toState('hovered');
        } else {
          sphere.toState('normal');
        }

        sphere.setIsEnabled(
          selectedNodes.length === 0 ||
            (sphere.isIndividual
              ? sphere.isInTheSameGroupWith(selectedNodes[0])
              : isThisYearSelected)
        );
      });
    });
  };

  onMount(() => {
    initRenderer(container);

    window.addEventListener('resize', updateCanvasSize);

    const onEachFrame = () => {
      requestAnimationFrame(onEachFrame);

      const [intersection] = getMouseIntersections(mouse, nodes);

      if (hoveredSphere && !hoveredSphere.is(intersection?.object)) {
        hoveredSphere = null;
        updateSpheresAppearance(selectedNodes);
      } else if (
        !hoveredSphere &&
        intersection &&
        intersection.object.type === 'SphereMesh'
      ) {
        hoveredSphere = intersection.object as Sphere<unknown>;
        updateSpheresAppearance(selectedNodes);
      }

      if (!isFreeze && selectedNodes.length === 0 && !hoveredSphere) {
        spherePlanes.forEach((plane) => plane.spin());
      }

      renderScene();
    };

    onEachFrame();
  });

  $: hoveredSphereIsIndividual = hoveredSphere?.isIndividual;
  $: hoveredSphereIsNotSelected = !selectedNodes.some((node) =>
    node.is(hoveredSphere)
  );
  $: hoveredSphereOffset = getObjectCanvasOffset(hoveredSphere);
  $: individualSelectedNodes = selectedNodes.filter(
    ({ isIndividual }) => isIndividual
  );
</script>

<div class="relative w-full" style="height: 720px;">
  <div class="absolute left-8 top-0 bottom-0 z-10 flex">
    <YearAxis {selectedYears} />
  </div>
  <div
    class="absolute inset-0"
    bind:this={container}
    on:mousemove={updateMousePosition}
    on:click={onContainerClick}
  >
    {#if hoveredSphereIsIndividual}
      {#if hoveredSphere.data['image']}
        <Tooltip
          {...hoveredSphereOffset}
          image={hoveredSphere.data['image']}
          alt={hoveredSphere.data['name']}
        />
      {/if}
      {#if hoveredSphereIsNotSelected}
        <Marker
          {...hoveredSphereOffset}
          number={hoveredSphere.data['number']}
        />
      {/if}
    {/if}
    {#each individualSelectedNodes as node}
      <Marker {...getObjectCanvasOffset(node)} number={node.data['number']} />
    {/each}
  </div>

  <div
    class="absolute bottom-8 right-8 z-10 flex flex-col space-y-2 w-full max-w-md justify-end"
  >
    <slot />
  </div>
</div>
