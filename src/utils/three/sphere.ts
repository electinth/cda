import { SphereGeometry, MeshBasicMaterial, Mesh, Spherical } from 'three';

export const Sphere = (radius, phi, color) => {
  const geometry = new SphereGeometry(Math.random() > 0.95 ? 8 : 4, 32, 32);
  const material = new MeshBasicMaterial({ color });
  const sphere = new Mesh(geometry, material);

  sphere.position.setFromSpherical(new Spherical(radius, phi));

  return sphere;
};
