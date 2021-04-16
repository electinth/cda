import gaussian from 'gaussian';

export const pickNumbersBetween = (
  min: number,
  max: number,
  amount: number
): number[] => {
  const mean = (max - min) / amount;
  const distribution = gaussian(0, mean / 3);

  return distribution
    .random(amount)
    .map((delta: number, index: number) => {
      const value = Math.round(index * mean + delta);

      return value < min
        ? max + value - min
        : value > max
        ? min + value - max
        : value;
    })
    .sort();
};
