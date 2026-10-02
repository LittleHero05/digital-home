import type { SoftShape } from "@/content/about";

type Point = [number, number];

// Builds a rounded-star outline matching Figma's star shape (first point at the top),
// normalised to 0–1 so it can be used with clipPathUnits="objectBoundingBox".
export function softShapePath({ points, inner, corner }: SoftShape, width: number, height: number) {
  const cx = width / 2;
  const cy = height / 2;
  const vertices: Point[] = [];

  for (let i = 0; i < points * 2; i++) {
    const angle = -Math.PI / 2 + (i * Math.PI) / points;
    const radius = i % 2 === 0 ? 1 : inner;
    vertices.push([cx + Math.cos(angle) * cx * radius, cy + Math.sin(angle) * cy * radius]);
  }

  const n = vertices.length;
  const toward = (from: Point, to: Point, distance: number): Point => {
    const length = Math.hypot(to[0] - from[0], to[1] - from[1]);
    const t = Math.min(distance, length / 2) / length;
    return [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t];
  };
  // Each corner is cut back along both edges and joined with a curve through the vertex.
  const corners = vertices.map((vertex, i) => ({
    vertex,
    start: toward(vertex, vertices[(i - 1 + n) % n], corner),
    end: toward(vertex, vertices[(i + 1) % n], corner),
  }));

  const fmt = ([x, y]: Point) => `${(x / width).toFixed(4)} ${(y / height).toFixed(4)}`;
  let d = `M ${fmt(corners[0].end)}`;
  for (let i = 1; i <= n; i++) {
    const c = corners[i % n];
    d += ` L ${fmt(c.start)} Q ${fmt(c.vertex)} ${fmt(c.end)}`;
  }
  return `${d} Z`;
}
