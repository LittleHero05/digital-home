// Sudoku helpers shared by the /sudoku page and scripts/sudoku.ts.
// A grid is 81 numbers in reading order; 0 means empty.

export type Grid = number[];

export const rowOf = (cell: number) => Math.floor(cell / 9);
export const colOf = (cell: number) => cell % 9;
export const boxOf = (cell: number) => 3 * Math.floor(rowOf(cell) / 3) + Math.floor(colOf(cell) / 3);

// For every cell, the 20 other cells in its row, column and box.
export const PEERS: number[][] = Array.from({ length: 81 }, (_, cell) => {
  const peers: number[] = [];
  for (let other = 0; other < 81; other++) {
    if (other === cell) continue;
    if (rowOf(other) === rowOf(cell) || colOf(other) === colOf(cell) || boxOf(other) === boxOf(cell)) {
      peers.push(other);
    }
  }
  return peers;
});

export function parseGrid(puzzle: string): Grid {
  return [...puzzle].map((char) => (char === "." ? 0 : Number(char)));
}

export function gridToString(grid: Grid): string {
  return grid.map((value) => (value === 0 ? "." : String(value))).join("");
}

// Bitmask of digits (bit 1 to bit 9) that could still go in a cell.
export function candidateMask(grid: Grid, cell: number): number {
  let used = 0;
  for (const peer of PEERS[cell]) used |= 1 << grid[peer];
  return ~used & 0b1111111110;
}

export function digitsInMask(mask: number): number[] {
  const digits: number[] = [];
  for (let digit = 1; digit <= 9; digit++) if (mask & (1 << digit)) digits.push(digit);
  return digits;
}

// Fills the grid in place. Tries digits in the order given by `order`, always picking the
// emptiest-looking cell first. Returns how many solutions were found, up to `limit`.
export function search(grid: Grid, limit: number, order: (digits: number[]) => number[] = (d) => d): number {
  let best = -1;
  let bestMask = 0;
  let bestCount = 10;
  for (let cell = 0; cell < 81; cell++) {
    if (grid[cell] !== 0) continue;
    const mask = candidateMask(grid, cell);
    const count = digitsInMask(mask).length;
    if (count === 0) return 0;
    if (count < bestCount) {
      best = cell;
      bestMask = mask;
      bestCount = count;
      if (count === 1) break;
    }
  }
  if (best === -1) return 1;

  let found = 0;
  for (const digit of order(digitsInMask(bestMask))) {
    grid[best] = digit;
    found += search(grid, limit - found, order);
    if (found >= limit) return found;
  }
  grid[best] = 0;
  return found;
}

export function countSolutions(puzzle: Grid, limit = 2): number {
  return search([...puzzle], limit);
}

export function solve(puzzle: string): string | null {
  const grid = parseGrid(puzzle);
  return search(grid, 1) === 1 ? gridToString(grid) : null;
}
