import { SphereGeometry, MeshBasicMaterial, Mesh, Color } from 'three';

const SPHERE_TRIANGLE = 32;
const DEFAULT_COLOR = '#b3b3b3';
export class Sphere extends Mesh {
  constructor(size: number) {
    const geometry = new SphereGeometry(size, SPHERE_TRIANGLE, SPHERE_TRIANGLE);
    const material = new MeshBasicMaterial({ color: DEFAULT_COLOR });
    super(geometry, material);

    this.type = 'SphereMesh';
  }

  public setColor(color: string) {
    (this.material as MeshBasicMaterial).color = new Color(color);
  }

  public resetColor() {
    (this.material as MeshBasicMaterial).color = new Color(DEFAULT_COLOR);
  }
}
