import { Group } from 'three';
import { Sphere } from './sphere';

export const SpherePlane = (amount, radius) => {
  const group = new Group();

  for (let i = 0; i < amount; i++) {
    group.add(
      Sphere(
        radius,
        (i * (Math.PI * 2)) / amount,
        i < amount / 3 ? 0x00ff00 : i < (amount * 2) / 3 ? 0x0000ff : 0xff0000
      )
    );
  }

  return group;
};
