export function orbitPosition(time: number, radius: number, offset = 0): [number, number, number] {
  const angle = time + offset;
  return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
}
export function damping(current: number, target: number, delta: number, speed = 3) {
  return current + (target - current) * (1 - Math.exp(-speed * delta));
}
export function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}
