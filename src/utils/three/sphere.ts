import { SphereGeometry, MeshBasicMaterial, Mesh, Color } from 'three';

const SPHERE_TRIANGLE = 32;
export const SPHERE_SIZE = 4;
export interface SphereConstructorProps {
  primaryColor: Color;
  accentColor: Color;
  group: string;
}

export class Sphere extends Mesh {
  private primaryColor: Color;
  private accentColor: Color;
  private haloMesh: Mesh<SphereGeometry, MeshBasicMaterial>;
  public group: string;

  constructor({
    primaryColor = new Color('#d3d3d3'),
    accentColor,
    group,
  }: SphereConstructorProps) {
    const geometry = new SphereGeometry(
      SPHERE_SIZE,
      SPHERE_TRIANGLE,
      SPHERE_TRIANGLE
    );
    const material = new MeshBasicMaterial();
    super(geometry, material);

    this.type = 'SphereMesh';
    this.primaryColor = primaryColor;
    this.accentColor = accentColor;

    this.toNormalState();

    if (group) {
      this.group = group;
    } else {
      this.haloMesh = new Mesh(
        new SphereGeometry(SPHERE_SIZE * 2, SPHERE_TRIANGLE, SPHERE_TRIANGLE),
        new MeshBasicMaterial({ color: accentColor })
      );
      this.haloMesh.material.transparent = true;
      this.haloMesh.material.opacity = 0.2;

      this.add(this.haloMesh);
    }
  }

  public toHoverState() {
    (this.material as MeshBasicMaterial).color = this.accentColor;
  }

  public toNormalState() {
    (this.material as MeshBasicMaterial).color = this.primaryColor;
  }

  public isInTheSameGroupWith(otherSphere: Sphere) {
    return this.group && this.group === otherSphere.group;
  }
}
