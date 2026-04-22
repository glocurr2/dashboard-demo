export function useRandomFloat(min: number, max: number): number {
  const str = (Math.random() * (max - min) + min).toFixed(2);
  return parseFloat(str);
}