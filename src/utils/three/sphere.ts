import { SphereGeometry, MeshBasicMaterial, Mesh } from 'three';

const SPHERE_TRIANGLE = 32;
export class Sphere extends Mesh {
  constructor(size: number) {
    const geometry = new SphereGeometry(size, SPHERE_TRIANGLE, SPHERE_TRIANGLE);
    const material = new MeshBasicMaterial({ color: '#b3b3b3' });
    super(geometry, material);
  }
}
