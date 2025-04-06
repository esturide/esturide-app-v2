export function scaleToNearest(
  size: number,
  factor: number,
  nearest: number = 10,
): number {
  const scaled = size / factor;
  return Math.ceil(scaled / nearest) * nearest;
}
