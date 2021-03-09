<script lang="ts">
  import { onMount } from 'svelte';
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

  const updateMousePosition = (event: MouseEvent) => {
    event.preventDefault();

    const { offsetX, offsetY } = event;

    mouse.x = (offsetX / container.clientWidth) * 2 - 1;
    mouse.y = -(offsetY / container.clientHeight) * 2 + 1;
  };

  onMount(() => {
    const scene = new Scene();
    scene.background = new Color('#ffffff');

    const axesHelper = new AxesHelper(500);
    scene.add(axesHelper);

    const aspect = container.clientWidth / container.clientHeight;

    const camera = new OrthographicCamera(
      (FRUSTUM_SIZE * aspect) / -2,
      (FRUSTUM_SIZE * aspect) / 2,
      FRUSTUM_SIZE / 2,
      FRUSTUM_SIZE / -2,
      0,
      10000
    );

    camera.position.set(1000, -2000, 0);
    camera.lookAt(scene.position);

    const renderer = new WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const spherePlanes = CDA_IN_EACH_YEAR.map((cdaAmount, index) => {
      const spherePlane = new SpherePlane(cdaAmount);
      spherePlane.position.x =
        (PLANE_DISTANCE * CDA_IN_EACH_YEAR.length) / 2 - index * PLANE_DISTANCE;

      return spherePlane;
    });

    scene.add(...spherePlanes);

    const raycaster = new Raycaster();
    let hoveredSphere: Sphere = null;

    const spheres = spherePlanes.reduce(
      (flatChildren, plane) => [...flatChildren, ...plane.children],
      []
    );

    const animate = () => {
      requestAnimationFrame(animate);

      raycaster.setFromCamera(mouse, camera);
      const [intersection] = raycaster.intersectObjects(spheres);

      if (
        hoveredSphere &&
        (!intersection || intersection.object.uuid !== hoveredSphere.uuid)
      ) {
        hoveredSphere.resetColor();
        hoveredSphere = null;
      }

      if (intersection && intersection.object.type === 'SphereMesh') {
        hoveredSphere = intersection.object as Sphere;
        hoveredSphere.setColor('#000000');
      }

      spherePlanes.forEach((plane) => plane.spin());

      renderer.render(scene, camera);
    };

    animate();
  });
</script>

<!-- <div>{mouse.x}, {mouse.y}</div> -->
<div
  class="w-full h-full flex-1"
  bind:this={container}
  on:mousemove={updateMousePosition}
/>
