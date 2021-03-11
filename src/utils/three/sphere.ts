import { SphereGeometry, MeshBasicMaterial, Mesh, Color } from 'three';

export const SPHERE_SIZE = 4;
const SPHERE_DATA_SIZE = 6;
const SPHERE_DATA_HOVER_SCALE = 1.5;
const SPHERE_TRIANGLE = 32;
const HALO_SIZE = 10;
const HALO_OPACITY = 0.2;

type scaleArray = [number, number, number];

export interface SphereConstructorProps {
  primaryColor: Color;
  accentColor: Color;
  group: string;
  data: unknown;
}

export class Sphere extends Mesh<SphereGeometry, MeshBasicMaterial> {
  private primaryColor: Color;
  private accentColor: Color;
  private haloMesh: Mesh<SphereGeometry, MeshBasicMaterial>;
  public group: string;
  public data: unknown;

  constructor({
    primaryColor = new Color('#d3d3d3'),
    accentColor,
    group,
    data,
  }: SphereConstructorProps) {
    const geometry = new SphereGeometry(
      data ? SPHERE_DATA_SIZE : SPHERE_SIZE,
      SPHERE_TRIANGLE,
      SPHERE_TRIANGLE
    );
    const material = new MeshBasicMaterial();
    super(geometry, material);

    this.type = 'SphereMesh';
    this.primaryColor = primaryColor;
    this.accentColor = accentColor;
    this.group = group;

    this.toNormalState();

    if (data) {
      this.data = data;

      this.haloMesh = new Mesh(
        new SphereGeometry(HALO_SIZE, SPHERE_TRIANGLE, SPHERE_TRIANGLE),
        new MeshBasicMaterial({ color: accentColor })
      );
      this.haloMesh.material.transparent = true;
      this.haloMesh.material.opacity = HALO_OPACITY;

      this.add(this.haloMesh);
    }
  }

  public toHoverState() {
    if (this.data) {
      this.haloMesh.geometry.scale(
        ...(new Array(3).fill(SPHERE_DATA_HOVER_SCALE) as scaleArray)
      );
    } else {
      this.material.color = this.accentColor;
    }
  }

  public toNormalState() {
    if (this.data) {
      this.haloMesh.geometry.scale(
        ...(new Array(3).fill(1 / SPHERE_DATA_HOVER_SCALE) as scaleArray)
      );
    } else {
      this.material.color = this.primaryColor;
    }
  }

  public isInTheSameGroupWith(otherSphere: Sphere) {
    return this.group && this.group === otherSphere.group;
  }
}
