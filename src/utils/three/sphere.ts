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
export const DISABLED_COLOR = new Color('#f6f6f6');

type SphereState = 'normal' | 'hovered' | 'selected';
type ScaleArray = [number, number, number];

const getScaleArray = (scaleValue: number) =>
  new Array(3).fill(scaleValue) as ScaleArray;

const scaleUpArrays = [
  getScaleArray(SPHERE_DATA_HOVER_SCALE),
  getScaleArray(SPHERE_DATA_HALO_HOVER_SCALE),
];

const scaleDownArrays = [
  getScaleArray(1 / SPHERE_DATA_HOVER_SCALE),
  getScaleArray(1 / SPHERE_DATA_HALO_HOVER_SCALE),
];

export interface SphereConstructorProps<T> {
  primaryColor: Color;
  hoveredColor?: Color;
  selectedColor?: Color;
  group: string;
  data?: T;
  isIndividual?: boolean;
}

export class Sphere<T> extends Mesh<SphereGeometry, MeshBasicMaterial> {
  private colorMap: Map<SphereState, Color>;
  private haloMesh: Mesh<SphereGeometry, MeshBasicMaterial>;
  private state: SphereState;
  private isEnabled: boolean;
  public group: string;
  public data: T;
  public isIndividual: boolean;
  public isSelectable: boolean;

  constructor({
    primaryColor,
    hoveredColor,
    selectedColor,
    group,
    data = null,
    isIndividual = false,
  }: SphereConstructorProps<T>) {
    const size = isIndividual ? SPHERE_DATA_SIZE : SPHERE_SIZE;
    const geometry = new SphereGeometry(size, SPHERE_TRIANGLE, SPHERE_TRIANGLE);
    const material = new MeshBasicMaterial();
    super(geometry, material);

    this.type = 'SphereMesh';
    this.colorMap = new Map([
      ['normal', primaryColor],
      ['hovered', hoveredColor || primaryColor],
      ['selected', selectedColor || hoveredColor || primaryColor],
    ]);
    this.group = group;
    this.isIndividual = isIndividual;
    this.state = 'normal';
    this.isEnabled = true;
    this.data = data;
    this.isSelectable = data !== null;

    this.material.color = this.colorMap.get('normal');

    if (isIndividual) {
      this.haloMesh = new Mesh(
        new SphereGeometry(size, SPHERE_TRIANGLE, SPHERE_TRIANGLE),
        new MeshBasicMaterial({ color: this.colorMap.get('hovered') })
      );
      this.haloMesh.material.transparent = true;
      this.haloMesh.material.opacity = HALO_OPACITY;

      this.add(this.haloMesh);
    }
  }

  public is(object: Object3D | null) {
    return this.uuid === object?.uuid;
  }

  public isInTheSameGroupWith(otherSphere: Sphere<unknown> | null) {
    return this.group && otherSphere?.group && this.group === otherSphere.group;
  }

  public toState(newState: SphereState) {
    if (!this.isSelectable || this.state === newState) return;

    if (this.isIndividual) {
      switch (newState) {
        case 'normal':
          this.scaleMesh('down');
          break;
        case 'hovered':
          this.scaleMesh('up');
          break;
      }
    }

    this.state = newState;

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
    const color =
      this.isEnabled || this.state === 'hovered'
        ? this.colorMap.get(this.state)
        : DISABLED_COLOR;

    this.material.color = color;

    if (this.isIndividual) {
      this.haloMesh.material.color = color;
    }
  }

  private scaleMesh(direction: 'up' | 'down') {
    const [mainMeshScale, haloMeshScale] =
      direction === 'up' ? scaleUpArrays : scaleDownArrays;

    this.geometry.scale(...mainMeshScale);
    this.haloMesh.geometry.scale(...haloMeshScale);
  }
}
