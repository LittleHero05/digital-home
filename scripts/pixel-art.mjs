// Draws the About page pixel objects and writes them as SVG files.
// Run with: node scripts/pixel-art.mjs
// Output: public/images/about/pixel/*.svg
//
// Pixel objects may use colors beyond the site palette; they are all defined here, once.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PIXEL = 4; // px per pixel at 1x

const PALETTE = {
  K: "#1B1F3B", // ink outline
  B: "#1D3FAE",
  W: "#FBFAF6",
  D: "#DAD7CC",
  Y: "#FFF9D4",
  X: "#FFFFFF",
  L: "#C9CCD6", // silver light
  M: "#9AA0B4", // silver mid
  N: "#5B6178", // silver dark
  Z: "#142C7C", // deep blue
  S: "#6FA8DC", // sky
  C: "#CDE7F0", // pale screen
  O: "#F29E4C", // orange
  R: "#E4572E", // red
  A: "#FFD23F", // gold
  G: "#6BBF59", // green
  T: "#3AAFA9", // teal
  U: "#8E6CCF", // purple
  H: "#F48FB1", // candy pink
  E: "#C08A5B", // wood
  F: "#8A5A3B", // dark wood
  I: "#FBC4D8", // pink highlight
  J: "#C9608A", // pink shadow
  Q: "#4B2A6B", // dark purple
  q: "#2E1845", // deepest purple
};

// ---------- drawing helpers ----------
const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill("."));
const set = (g, x, y, c) => {
  if (g[y] && x >= 0 && x < g[0].length) g[y][x] = c;
};
const get = (g, x, y) => (g[y] ? g[y][x] : undefined);
const line = (g, x0, x1, y, c) => {
  for (let x = x0; x <= x1; x++) set(g, x, y, c);
};
const vline = (g, x, y0, y1, c) => {
  for (let y = y0; y <= y1; y++) set(g, x, y, c);
};
const pattern = (g, x0, y0, rows) =>
  rows.forEach((row, dy) =>
    row.split("").forEach((c, dx) => {
      if (c !== ".") set(g, x0 + dx, y0 + dy, c);
    }),
  );

function roundRect(g, x0, y0, w, h, r, fill, outline = "K") {
  const inside = (lx, ly) => {
    if (lx < 0 || ly < 0 || lx >= w || ly >= h) return false;
    const dx = Math.max(r - lx, 0, lx - (w - 1 - r));
    const dy = Math.max(r - ly, 0, ly - (h - 1 - r));
    return dx * dx + dy * dy <= r * r + r * 0.8;
  };
  for (let ly = 0; ly < h; ly++) {
    for (let lx = 0; lx < w; lx++) {
      if (!inside(lx, ly)) continue;
      const edge = !inside(lx - 1, ly) || !inside(lx + 1, ly) || !inside(lx, ly - 1) || !inside(lx, ly + 1);
      set(g, x0 + lx, y0 + ly, edge ? outline : fill);
    }
  }
}

function rect(g, x0, y0, w, h, fill, outline) {
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x < x0 + w; x++) {
      const edge = outline && (x === x0 || y === y0 || x === x0 + w - 1 || y === y0 + h - 1);
      set(g, x, y, edge ? outline : fill);
    }
  }
}

function disc(g, cx, cy, r, fill, outline = "K") {
  for (let y = Math.floor(cy - r - 1); y <= Math.ceil(cy + r + 1); y++) {
    for (let x = Math.floor(cx - r - 1); x <= Math.ceil(cx + r + 1); x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (d <= r + 0.35) set(g, x, y, d > r - 0.65 ? outline : fill);
    }
  }
}

// Shade the bottom-right part of a ring, for depth on the click wheel.
function shadeRing(g, cx, cy, r0, r1, c) {
  for (let y = Math.floor(cy); y <= Math.ceil(cy + r1); y++) {
    for (let x = Math.floor(cx - r1); x <= Math.ceil(cx + r1); x++) {
      const d = Math.hypot(x - cx, y - cy);
      const a = Math.atan2(y - cy, x - cx);
      if (d > r0 && d <= r1 && a > -0.3 && a < 2.2 && get(g, x, y) !== "K") set(g, x, y, c);
    }
  }
}

function wheelMarks(g, cx, cy, r, c) {
  const m = Math.round(r - 1.8);
  set(g, Math.floor(cx), Math.round(cy - m), c);
  set(g, Math.ceil(cx), Math.round(cy - m), c);
  vline(g, Math.round(cx - m), Math.round(cy) - 1, Math.round(cy), c);
  vline(g, Math.round(cx + m), Math.round(cy) - 1, Math.round(cy), c);
  set(g, Math.floor(cx) - 1, Math.round(cy + m), c);
  set(g, Math.ceil(cx) + 1, Math.round(cy + m), c);
}

function note(g, x, y, c) {
  vline(g, x + 2, y, y + 3, c);
  set(g, x + 3, y, c);
  set(g, x + 3, y + 1, c);
  line(g, x, x + 2, y + 4, c);
  set(g, x, y + 3, c);
  set(g, x + 1, y + 3, c);
}

function sparkle(g, x, y, c) {
  set(g, x, y, c);
  set(g, x - 1, y, c);
  set(g, x + 1, y, c);
  set(g, x, y - 1, c);
  set(g, x, y + 1, c);
}

// ---------- objects ----------

// Music: silver classic iPod with a sunset now-playing screen and earbuds.
function ipod() {
  const g = grid(44, 44);
  const oy = 4;
  vline(g, 18, 1, 3, "M");
  line(g, 18, 31, 1, "M");
  vline(g, 31, 1, 13, "M");
  line(g, 27, 35, 13, "M");
  vline(g, 27, 13, 17, "M");
  vline(g, 35, 13, 20, "M");
  disc(g, 27, 19.5, 2.3, "X");
  set(g, 28, 20, "L");
  disc(g, 35, 22.5, 2.3, "X");
  set(g, 36, 23, "L");
  roundRect(g, 0, oy, 24, 40, 4, "L");
  vline(g, 1, oy + 5, oy + 34, "X");
  vline(g, 2, oy + 7, oy + 12, "X");
  vline(g, 22, oy + 5, oy + 35, "M");
  line(g, 5, 19, oy + 38, "M");
  rect(g, 3, oy + 3, 18, 15, "C", "K");
  line(g, 4, 19, oy + 4, "S");
  line(g, 16, 18, oy + 4, "G");
  ["UUUUUU", "UUHHUU", "RRAARR", "OOAAOO", "AAAAAA", "TTTTTT"].forEach((row, r) =>
    row.split("").forEach((c, i) => set(g, 5 + i, oy + 6 + r, c)),
  );
  line(g, 12, 18, oy + 6, "K");
  line(g, 12, 16, oy + 8, "N");
  line(g, 12, 17, oy + 10, "B");
  rect(g, 5, oy + 13, 14, 3, "X", "K");
  line(g, 6, 8, oy + 14, "R");
  line(g, 9, 11, oy + 14, "O");
  set(g, 12, oy + 14, "A");
  set(g, 19, oy + 5, "X");
  set(g, 18, oy + 4, "X");
  const cx = 11.5;
  const cy = oy + 28;
  disc(g, cx, cy, 8, "X");
  shadeRing(g, cx, cy, 4.2, 7.3, "L");
  disc(g, cx, cy, 3.4, "L");
  set(g, 10, cy - 1, "X");
  wheelMarks(g, cx, cy, 8, "N");
  note(g, 36, 3, "U");
  note(g, 40, 8, "T");
  sparkle(g, 38, 26, "O");
  return g;
}

// Camera: solid-pink compact, Cyber-shot style.
function camera() {
  const g = grid(40, 26);
  rect(g, 24, 0, 6, 3, "L", "K");
  set(g, 25, 1, "X");
  rect(g, 17, 1, 4, 2, "N", "K");
  roundRect(g, 0, 2, 36, 22, 3, "H");
  line(g, 4, 31, 3, "I");
  vline(g, 1, 6, 19, "I");
  vline(g, 34, 6, 20, "J");
  line(g, 4, 31, 22, "J");
  line(g, 4, 16, 12, "L");
  set(g, 3, 12, "L");
  disc(g, 10, 12, 7, "L");
  disc(g, 10, 12, 5.4, "N");
  disc(g, 10, 12, 3.8, "Z");
  disc(g, 10, 12, 2, "S", "S");
  set(g, 8, 10, "X");
  set(g, 9, 9, "X");
  set(g, 12, 14, "C");
  rect(g, 26, 6, 7, 4, "C", "K");
  set(g, 27, 7, "X");
  set(g, 28, 7, "X");
  set(g, 22, 7, "O");
  set(g, 23, 7, "O");
  line(g, 20, 32, 15, "L");
  line(g, 20, 31, 16, "X");
  line(g, 22, 29, 18, "J");
  set(g, 31, 18, "J");
  sparkle(g, 38, 2, "A");
  set(g, 36, 0, "O");
  return g;
}

// Book: dark purple hardcover with a gold frame and a ribbon.
function book() {
  const g = grid(30, 36);
  rect(g, 3, 3, 25, 30, "X", "K");
  vline(g, 26, 5, 30, "L");
  line(g, 5, 25, 31, "L");
  vline(g, 27, 6, 29, "D");
  roundRect(g, 1, 1, 25, 30, 1, "Q");
  vline(g, 3, 2, 29, "q");
  vline(g, 4, 2, 29, "q");
  vline(g, 5, 2, 29, "K");
  vline(g, 2, 3, 27, "U");
  vline(g, 24, 3, 29, "q");
  line(g, 6, 24, 29, "q");
  rect(g, 8, 4, 14, 23, "Q", "A");
  set(g, 9, 5, "A");
  set(g, 20, 5, "A");
  set(g, 9, 25, "A");
  set(g, 20, 25, "A");
  sparkle(g, 15, 15, "A");
  set(g, 15, 15, "H");
  vline(g, 18, 31, 35, "R");
  vline(g, 19, 31, 34, "R");
  set(g, 17, 35, "R");
  return g;
}

// Statistics: wooden clipboard with a bar chart; the red bar is the number that got me.
function clipboard() {
  const g = grid(30, 41);
  roundRect(g, 1, 4, 27, 36, 2, "E");
  vline(g, 2, 6, 37, "O");
  vline(g, 26, 6, 38, "F");
  line(g, 3, 26, 38, "F");
  rect(g, 5, 8, 20, 29, "X", "K");
  line(g, 6, 24, 37, "F");
  rect(g, 9, 5, 12, 4, "L", "K");
  roundRect(g, 11, 1, 8, 6, 1, "L");
  rect(g, 13, 2, 4, 2, "N");
  line(g, 10, 19, 6, "X");
  line(g, 7, 16, 11, "K");
  line(g, 7, 12, 13, "M");
  vline(g, 7, 16, 28, "K");
  line(g, 7, 22, 28, "K");
  [
    [9, 4, "S"],
    [12, 7, "T"],
    [15, 5, "G"],
    [18, 10, "R"],
    [21, 6, "U"],
  ].forEach(([x, h, c]) => {
    for (let y = 28 - h; y < 28; y++) {
      set(g, x, y, c);
      set(g, x + 1, y, c);
    }
  });
  set(g, 17, 16, "R");
  set(g, 20, 16, "R");
  line(g, 18, 19, 15, "R");
  line(g, 7, 20, 31, "M");
  line(g, 7, 17, 33, "M");
  return g;
}

// Links: cream envelope with a letter peeking out, heart seal, stamp and postmark.
function envelope() {
  const g = grid(38, 32);
  rect(g, 6, 4, 26, 10, "X", "K");
  line(g, 9, 24, 7, "M");
  line(g, 9, 20, 9, "M");
  roundRect(g, 1, 9, 36, 22, 1, "Y");
  vline(g, 2, 11, 28, "X");
  vline(g, 35, 11, 29, "D");
  line(g, 3, 34, 29, "D");
  for (let x = 2; x <= 18; x++) set(g, x, 10 + Math.round(((x - 2) * 9) / 16), "O");
  for (let x = 19; x <= 35; x++) set(g, x, 10 + Math.round(((35 - x) * 9) / 16), "O");
  pattern(g, 15, 17, [".RR.RR.", "RHRRRRR", "RRRRRRR", ".RRRRR.", "..RRR..", "...R..."]);
  rect(g, 26, 11, 9, 10, "X", "D");
  for (let x = 26; x <= 34; x += 2) {
    set(g, x, 11, "Y");
    set(g, x, 20, "Y");
  }
  rect(g, 28, 13, 5, 6, "S");
  set(g, 29, 14, "A");
  set(g, 30, 14, "A");
  set(g, 29, 15, "A");
  line(g, 28, 32, 17, "G");
  line(g, 28, 32, 18, "G");
  for (let x = 19; x <= 25; x++) {
    set(g, x, 12 + (x % 4 < 2 ? 0 : 1), "N");
    set(g, x, 15 + (x % 4 < 2 ? 0 : 1), "N");
  }
  return g;
}

// ---------- SVG output ----------
function toSvg(g) {
  const w = g[0].length;
  const h = g.length;
  let rects = "";
  g.forEach((row, y) => {
    let x = 0;
    while (x < w) {
      const c = row[x];
      if (c === ".") {
        x++;
        continue;
      }
      let end = x;
      while (end < w && row[end] === c) end++;
      rects += `<rect x="${x}" y="${y}" width="${end - x}" height="1" fill="${PALETTE[c]}"/>`;
      x = end;
    }
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w * PIXEL}" height="${h * PIXEL}" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">${rects}</svg>\n`;
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "about", "pixel");
mkdirSync(outDir, { recursive: true });

const objects = { ipod, camera, book, clipboard, envelope };
for (const [name, draw] of Object.entries(objects)) {
  const g = draw();
  writeFileSync(join(outDir, `${name}.svg`), toSvg(g));
  console.log(`${name}.svg  ${g[0].length * PIXEL}x${g.length * PIXEL}`);
}
