import {
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
  Object3D,
} from 'three';

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
  accentColor?: Color;
  group: string;
  data?: unknown;
  isIndividual?: boolean;
}

export class Sphere extends Mesh<SphereGeometry, MeshBasicMaterial> {
  private primaryColor: Color;
  private accentColor: Color;
  private haloMesh: Mesh<SphereGeometry, MeshBasicMaterial>;
  private isActive: boolean;
  private isEnabled: boolean;
  public group: string;
  public data: unknown;
  public isIndividual: boolean;
  public isSelectable: boolean;

  constructor({
    primaryColor,
    accentColor,
    group,
    data = null,
    isIndividual = false,
  }: SphereConstructorProps) {
    const size = isIndividual ? SPHERE_DATA_SIZE : SPHERE_SIZE;
    const geometry = new SphereGeometry(size, SPHERE_TRIANGLE, SPHERE_TRIANGLE);
    const material = new MeshBasicMaterial();
    super(geometry, material);

    this.type = 'SphereMesh';
    this.primaryColor = primaryColor;
    this.accentColor = accentColor || primaryColor;
    this.group = group;
    this.isIndividual = isIndividual;
    this.isActive = false;
    this.isEnabled = true;
    this.data = data;
    this.isSelectable = data !== null;

    this.material.color = this.primaryColor;

    if (isIndividual) {
      this.haloMesh = new Mesh(
        new SphereGeometry(size, SPHERE_TRIANGLE, SPHERE_TRIANGLE),
        new MeshBasicMaterial({ color: this.accentColor })
      );
      this.haloMesh.material.transparent = true;
      this.haloMesh.material.opacity = HALO_OPACITY;

      this.add(this.haloMesh);
    }
  }

  public is(object: Object3D | null) {
    return this.uuid === object?.uuid;
  }

  public isInTheSameGroupWith(otherSphere: Sphere | null) {
    return this.group && otherSphere?.group && this.group === otherSphere.group;
  }

  public toActiveState() {
    if (!this.isSelectable || this.isActive) return;

    if (this.isIndividual) {
      this.scaleMesh('up');
    }

    this.isActive = true;

    this.updateMeshColor();
  }

  public toNormalState() {
    if (!this.isSelectable || !this.isActive) return;

    if (this.isIndividual) {
      this.scaleMesh('down');
    }

    this.isActive = false;

    this.updateMeshColor();
  }

  public disable() {
    this.isEnabled = false;
    this.updateMeshColor();
  }

  public enable() {
    this.isEnabled = true;
    this.updateMeshColor();
  }

  private updateMeshColor() {
    const color = this.getColorFromCurrentState();
    this.material.color = color;

    if (this.isIndividual) {
      this.haloMesh.material.color = color;
    }
  }

  private getColorFromCurrentState(): Color {
    return this.isActive
      ? this.accentColor
      : this.isEnabled
      ? this.primaryColor
      : DISABLED_COLOR;
  }

  private scaleMesh(direction: 'up' | 'down') {
    const [mainMeshScale, haloMeshScale] =
      direction === 'up' ? scaleUpArrays : scaleDownArrays;

    this.geometry.scale(...mainMeshScale);
    this.haloMesh.geometry.scale(...haloMeshScale);
  }
}
