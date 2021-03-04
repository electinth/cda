<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { SpherePlane } from '../utils/three/sphere-plane';

  const PLANE_DISTANCE = 200;
  const CDA_IN_EACH_YEAR = [40, 240, 99, 100];

  let container: HTMLElement;

  onMount(() => {
    const scene = new THREE.Scene();

    const axesHelper = new THREE.AxesHelper(500);
    scene.add(axesHelper);

    scene.background = new THREE.Color('ffffff');

    const camera = new THREE.OrthographicCamera(
      container.clientWidth / -2,
      container.clientWidth / 2,
      container.clientHeight / 2,
      container.clientHeight / -2,
      -1000,
      1000
    );

    camera.position.x = 10;
    camera.position.y = -20;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const spherePlanes = CDA_IN_EACH_YEAR.map((cdaAmount, index) => {
      const spherePlane = new SpherePlane(cdaAmount);
      spherePlane.position.x =
        (PLANE_DISTANCE * CDA_IN_EACH_YEAR.length) / 2 - index * PLANE_DISTANCE;

      return spherePlane;
    });

    scene.add(...spherePlanes);

    const animate = function () {
      requestAnimationFrame(animate);

      spherePlanes.forEach((plane) => plane.spin());

      renderer.render(scene, camera);
    };

    animate();
  });
</script>

<div class="w-full h-full flex-1" bind:this={container} />
