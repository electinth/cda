<script lang="ts">
  import { onMount } from 'svelte';
  import { Vector2 } from 'three';
  import type {
    Sphere,
    SphereConstructorProps,
  } from '../../utils/three/sphere';
  import { SpherePlane } from '../../utils/three/sphere-plane';
  import { createStage } from '../../utils/three/stage';
  import Marker from './marker.svelte';
  import Tooltip from './tooltip.svelte';

  export let data: SphereConstructorProps[][];

  const PLANE_DISTANCE = 200;

  let container: HTMLElement,
    mouse = new Vector2(1, 1),
    hoveredSphere: Sphere = null,
    selectedNodes: Sphere[] = [];

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
    selectedNodes = hoveredSphere?.isSelectable
      ? getAllSphereInHoveredSphereGroup()
      : [];
    updateSpheresAppearance();
  };

  const updateSpheresAppearance = () =>
    spherePlanes.forEach(({ children }) => {
      const isChildrenEnabled =
        selectedNodes.length === 0 ||
        children.some((sphere: Sphere) =>
          selectedNodes.some((node) => sphere.is(node))
        );

      children.forEach((sphere: Sphere) => {
        if (
          sphere.is(hoveredSphere) ||
          (!sphere.isIndividual &&
            sphere.isInTheSameGroupWith(hoveredSphere)) ||
          selectedNodes.some((node) => sphere.is(node))
        ) {
          sphere.toActiveState();
        } else {
          sphere.toNormalState();
        }

        if (isChildrenEnabled) {
          sphere.enable();
        } else {
          sphere.disable();
        }
      });
    });

  onMount(() => {
    initRenderer(container);

    window.addEventListener('resize', updateCanvasSize);

    const onEachFrame = () => {
      requestAnimationFrame(onEachFrame);

      const [intersection] = getMouseIntersections(mouse, spheres);

      if (hoveredSphere && !hoveredSphere.is(intersection?.object)) {
        hoveredSphere = null;
        updateSpheresAppearance();
      } else if (
        !hoveredSphere &&
        intersection &&
        intersection.object.type === 'SphereMesh'
      ) {
        hoveredSphere = intersection.object as Sphere;
        updateSpheresAppearance();
      }

      if (selectedNodes.length === 0 && !hoveredSphere) {
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

<div
  class="relative w-full h-screen flex-1"
  bind:this={container}
  on:mousemove={updateMousePosition}
  on:click={onContainerClick}
>
  {#if hoveredSphereIsIndividual}
    <Tooltip
      {...hoveredSphereOffset}
      label={JSON.stringify(hoveredSphere.data)}
    />
    {#if hoveredSphereIsNotSelected}
      <Marker {...hoveredSphereOffset} number={hoveredSphere.data['number']} />
    {/if}
  {/if}
  {#each individualSelectedNodes as node}
    <Marker {...getObjectCanvasOffset(node)} number={node.data['number']} />
  {/each}
</div>
