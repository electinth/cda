import { Group, Spherical } from 'three';
import { Sphere } from './sphere';

const SPHERE_SIZE = 4;
const SPACE_BETWEEN_SPHERE = 4;

export class SpherePlane extends Group {
  isSpinning = true;

  constructor(amount: number) {
    super();

    const radius =
      (amount * (2 * SPHERE_SIZE + SPACE_BETWEEN_SPHERE)) / (2 * Math.PI);
    const oneSphereRadient = (Math.PI * 2) / amount;

    for (let i = 0; i < amount; i++) {
      const sphere = new Sphere(SPHERE_SIZE);

      sphere.position.setFromSpherical(
        new Spherical(radius, i * oneSphereRadient)
      );

      this.add(sphere);
    }
  }

  spin() {
    if (this.isSpinning) {
      this.rotateX(Math.PI / 2000);
    }
  }
}
