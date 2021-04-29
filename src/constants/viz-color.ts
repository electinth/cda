import { Color } from 'three';

export const DEFAULT_COLOR = new Color('#C8C8C8');
export const DISABLED_COLOR = new Color('#EEEEEE');

export const PRIMARY_COLORS = [
  new Color('#588B8B'),
  new Color('#FF7D00'),
  new Color('#A394FF'),
  new Color('#B8B08D'),
  new Color('#C8553D'),
  new Color('#9CC9FF'),
  new Color('#4A769F'),
  new Color('#F39B8E'),
  new Color('#68C2CC'),
];

export const SECONDARY_COLORS = PRIMARY_COLORS.map((color) =>
  color.clone().multiplyScalar(1.1)
);
