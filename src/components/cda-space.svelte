<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { SpherePlane } from '../utils/three/sphere-plane';

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

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const plane2 = SpherePlane(100);
    const plane = SpherePlane(240);

    plane.position.x = -100;
    plane2.position.x = 100;

    scene.add(plane);
    scene.add(plane2);

    camera.position.x = 10;
    camera.position.y = -20;

    camera.lookAt(0, 0, 0);

    const animate = function () {
      requestAnimationFrame(animate);

      plane.rotateX(Math.PI / 2000);
      plane2.rotateX(-Math.PI / 2000);

      renderer.render(scene, camera);
    };

    animate();
  });
</script>

<div class="w-full h-full flex-1" bind:this={container} />
