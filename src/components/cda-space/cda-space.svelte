<script context="module">
  export const TRANSITION_DELAY = 500;
</script>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { Vector2 } from 'three';
  import IntersectionObserver from 'svelte-intersection-observer';
  import anime from 'animejs/lib/anime.es.js';
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

  const PLANE_DISTANCE = 180;

  export let data: SphereConstructorProps<unknown>[][];
  export let nodes: Sphere<unknown>[] = [];
  export let selectedNodes: Sphere<unknown>[] = [];
  export let selectedYears: string[] = [];
  export let isFreeze: boolean = false;
  export let transitionConfig = {
    delay: 500,
    duration: 1000,
  };

  let container: HTMLElement,
    mouse = new Vector2(1, 1),
    hoveredSphere: Sphere<unknown> = null,
    spherePlanes: SpherePlane[],
    isMobile: boolean = false,
    intersecting: boolean = false,
    labelElements: NodeListOf<HTMLDivElement>;

  const dispatch = createEventDispatcher();

  const getAnimationStep = (index: number) => ({
    delay: TRANSITION_DELAY + index * transitionConfig.delay,
    duration: transitionConfig.duration,
  });

  const {
    scene,
    initRenderer,
    renderScene,
    updateCanvasSize,
    getMouseIntersections,
    getObjectCanvasOffset,
  } = createStage();

  spherePlanes = data.map((planeData) => new SpherePlane(planeData));

  spherePlanes.forEach((spherePlane, yearIndex) => {
    spherePlane.position.x =
      PLANE_DISTANCE * ((data.length - 1) / 2 - yearIndex);
  });

  scene.add(...spherePlanes);

  nodes = spherePlanes.reduce(
    (flatChildren, plane) => [...flatChildren, ...plane.children],
    []
  );

  nodes.forEach((node: Sphere<{}>) => {
    node.material.transparent = true;
    node.material.opacity = 0;
  });

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
    if (isMobile) return;

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

    const onEachFrame = () => {
      requestAnimationFrame(onEachFrame);

      const [intersection] = getMouseIntersections(mouse, nodes);

      if (!isMobile) {
        if (hoveredSphere && !hoveredSphere.is(intersection?.object)) {
          hoveredSphere = null;
          updateSpheresAppearance(selectedNodes);
        } else if (
          !hoveredSphere &&
          intersection &&
          intersection.object.type === 'SphereMesh' &&
          intersection.object['isSelectable']
        ) {
          hoveredSphere = intersection.object as Sphere<unknown>;
          updateSpheresAppearance(selectedNodes);
        }
      }

      if (!isFreeze && selectedNodes.length === 0 && !hoveredSphere) {
        spherePlanes.forEach((plane) => plane.spin());
      }

      renderScene();
    };

    onEachFrame();
  });

  const onResize = () => {
    updateCanvasSize();
    isMobile = window.innerWidth < 768;
  };

  const playTransition = () => {
    dispatch('transitionstart');

    spherePlanes.forEach(({ children }, index) => {
      anime({
        targets: [
          ...children.map(({ material }: Sphere<{}>) => material),
          labelElements[index],
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
  };

  const replayTransition = () => {
    selectedNodes = [];
    playTransition();
  };

  $: hoveredSphereIsIndividual = hoveredSphere?.isIndividual;
  $: hoveredSphereIsNotSelected = !selectedNodes.some((node) =>
    node.is(hoveredSphere)
  );
  $: hoveredSphereOffset = getObjectCanvasOffset(hoveredSphere);
  $: individualSelectedNodes = selectedNodes.filter(
    ({ isIndividual }) => isIndividual
  );

  $: {
    if (labelElements) {
      labelElements.forEach((label) => {
        label.style.opacity = '0';
      });
    }
  }

  $: {
    if (intersecting) playTransition();
  }
</script>

<svelte:window on:resize={onResize} />

<IntersectionObserver
  element={container}
  bind:intersecting
  once
  threshold={0.3}
>
  <div class="relative mx-auto w-full">
    <button
      class="absolute top-0 right-0 rounded border border-black"
      on:click={replayTransition}
    >
      replay
    </button>
    <div class="hidden md:flex absolute left-0 top-0 bottom-0 z-10">
      <YearAxis bind:labelElements {selectedYears} />
    </div>
    <div
      class:cursor-pointer={hoveredSphere && hoveredSphere.isSelectable}
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
      class="md:absolute md:bottom-0 md:right-0 z-10 flex flex-col space-y-2 w-full max-w-md justify-end mt-8"
    >
      <slot />
    </div>
  </div>
</IntersectionObserver>
