<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import {
    Raycaster,
    Scene,
    Color,
    OrthographicCamera,
    WebGLRenderer,
    AxesHelper,
    Vector2,
  } from 'three';
  import type { Sphere } from '../utils/three/sphere';
  import { SpherePlane } from '../utils/three/sphere-plane';

  const FRUSTUM_SIZE = 1000;
  const PLANE_DISTANCE = 200;
  const CDA_IN_EACH_YEAR = [40, 240, 99, 100];

  let container: HTMLElement;
  let mouse = new Vector2(1, 1);
  let hoveredSphere: Sphere = null;

  const dispatch = createEventDispatcher();

  const scene = new Scene();
  scene.background = new Color('#ffffff');

  const axesHelper = new AxesHelper(500);
  scene.add(axesHelper);

  const spherePlanes = CDA_IN_EACH_YEAR.map((cdaAmount, index) => {
    const spherePlane = new SpherePlane(
      new Array(cdaAmount).fill({
        accentColor: new Color('#ffd3d3'),
        group: index % 2 === 0 ? `${index}` : null,
      })
    );
    spherePlane.position.x =
      PLANE_DISTANCE * ((CDA_IN_EACH_YEAR.length - 1) / 2 - index);

    return spherePlane;
  });

  scene.add(...spherePlanes);

  const camera = new OrthographicCamera(0, 0, 0, 0, 0, 10000);
  camera.position.set(1000, -2000, 0);
  camera.lookAt(scene.position);

  const raycaster = new Raycaster();
  let renderer: WebGLRenderer;

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

  const updateCanvasSize = ({ clientWidth, clientHeight }: HTMLElement) => {
    const aspect = clientWidth / clientHeight;

    camera.left = (FRUSTUM_SIZE * aspect) / -2;
    camera.right = (FRUSTUM_SIZE * aspect) / 2;
    camera.top = FRUSTUM_SIZE / 2;
    camera.bottom = FRUSTUM_SIZE / -2;
    camera.updateProjectionMatrix();

    renderer.setSize(clientWidth, clientHeight);
  };

  onMount(() => {
    let isSpinning = true;

    renderer = new WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);

    updateCanvasSize(container);
    window.addEventListener('resize', () => updateCanvasSize(container));

    container.appendChild(renderer.domElement);

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

      raycaster.setFromCamera(mouse, camera);
      const [intersection] = raycaster.intersectObjects(spheres);

      if (
        hoveredSphere &&
        (!intersection || intersection.object.uuid !== hoveredSphere.uuid)
      ) {
        updateSpheresState('toNormalState');
        hoveredSphere = null;
        isSpinning = true;
      }

      if (intersection && intersection.object.type === 'SphereMesh') {
        isSpinning = false;
        hoveredSphere = intersection.object as Sphere;
        updateSpheresState('toHoverState');
      }

      if (isSpinning) {
        spherePlanes.forEach((plane) => plane.spin());
      }

      renderer.render(scene, camera);
    };

    onEachFrame();
  });
</script>

<div
  class="w-full h-full flex-1"
  bind:this={container}
  on:mousemove={updateMousePosition}
  on:click={() => hoveredSphere && dispatch('nodeclick', hoveredSphere)}
/>
