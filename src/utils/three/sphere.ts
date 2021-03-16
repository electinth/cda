import { SphereGeometry, MeshBasicMaterial, Mesh, Color } from 'three';

export const SPHERE_SIZE = 4;
const SPHERE_TRIANGLE = 32;
const SPHERE_DATA_SIZE = 8;
const SPHERE_DATA_HOVER_SCALE = 1.5;
const SPHERE_DATA_HALO_HOVER_SCALE = 2.5;
const HALO_OPACITY = 0.2;
const DISABLED_COLOR = new Color('#f6f6f6');

type scaleArray = [number, number, number];

const getScaleArray = (scaleValue: number) =>
  new Array(3).fill(scaleValue) as scaleArray;

const scaleUpArrays = [
  getScaleArray(SPHERE_DATA_HOVER_SCALE),
  getScaleArray(SPHERE_DATA_HALO_HOVER_SCALE),
];

const scaleDownArrays = [
  getScaleArray(1 / SPHERE_DATA_HOVER_SCALE),
  getScaleArray(1 / SPHERE_DATA_HALO_HOVER_SCALE),
];

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
  private isActive: boolean;
  private isEnabled: boolean;
  public group: string;
  public data: unknown;

  constructor({
    primaryColor,
    accentColor,
    group,
    data,
  }: SphereConstructorProps) {
    const size = data ? SPHERE_DATA_SIZE : SPHERE_SIZE;
    const geometry = new SphereGeometry(size, SPHERE_TRIANGLE, SPHERE_TRIANGLE);
    const material = new MeshBasicMaterial();
    super(geometry, material);

    this.type = 'SphereMesh';
    this.primaryColor = primaryColor;
    this.accentColor = accentColor;
    this.group = group;
    this.isActive = false;
    this.isEnabled = true;

    this.material.color = this.primaryColor;

    if (data) {
      this.data = data;

      this.haloMesh = new Mesh(
        new SphereGeometry(size, SPHERE_TRIANGLE, SPHERE_TRIANGLE),
        new MeshBasicMaterial({ color: accentColor })
      );
      this.haloMesh.material.transparent = true;
      this.haloMesh.material.opacity = HALO_OPACITY;

      this.add(this.haloMesh);
    }
  }

  public toActiveState() {
    if (this.isActive) return;

    if (this.data) {
      this.scaleMesh('up');
    } else {
      this.material.color = this.accentColor;
    }

    this.isActive = true;
  }

  public toNormalState() {
    if (!this.isActive) return;

    if (this.data) {
      this.scaleMesh('down');
    } else {
      this.material.color = this.isEnabled ? this.primaryColor : DISABLED_COLOR;
    }

    this.isActive = false;
  }

  public isInTheSameGroupWith(otherSphere: Sphere) {
    return this.group && this.group === otherSphere.group;
  }

  public disable() {
    this.material.color = DISABLED_COLOR;

    if (this.data) {
      this.haloMesh.material.color = DISABLED_COLOR;
    }

    this.isEnabled = false;
  }

  public enable() {
    this.material.color = this.primaryColor;

    if (this.data) {
      this.haloMesh.material.color = this.accentColor;
    }

    this.isEnabled = true;
  }

  private scaleMesh(direction: 'up' | 'down') {
    const [mainMeshScale, haloMeshScale] =
      direction === 'up' ? scaleUpArrays : scaleDownArrays;

    this.geometry.scale(...mainMeshScale);
    this.haloMesh.geometry.scale(...haloMeshScale);
  }
}
