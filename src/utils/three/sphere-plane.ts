import { Group, Spherical } from 'three';
import { Sphere, SphereConstructorProps, SPHERE_SIZE } from './sphere';

const SPACE_BETWEEN_SPHERE = 4;
const SPIN_FRAME_ROTATION = Math.PI / 2000;

export class SpherePlane extends Group {
  constructor(spheresData: SphereConstructorProps<unknown>[]) {
    super();

    const radius =
      (spheresData.length * (2 * SPHERE_SIZE + SPACE_BETWEEN_SPHERE)) /
      (2 * Math.PI);
    const oneSphereRadient = (Math.PI * 2) / spheresData.length;

    spheresData.forEach((data, i) => {
      const sphere = new Sphere(data);

      sphere.position.setFromSpherical(
        new Spherical(radius, i * oneSphereRadient)
      );

      this.add(sphere);
    });
  }

  spin() {
    this.rotateX(SPIN_FRAME_ROTATION);
  }
}
