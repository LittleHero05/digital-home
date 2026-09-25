"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

// Saved by /sudoku when a daily puzzle is solved:
// { "digits": [4, 7, 1], "lastSolved": "2026-09-23" }
const STORAGE_KEY = "curiosity-tracker";
const SIZE = 9;

type TrackerState = {
  digits: number[];
  lastSolved: string | null;
};

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function readRaw() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function parse(raw: string | null): TrackerState {
  try {
    const value = raw ? JSON.parse(raw) : null;
    if (value && Array.isArray(value.digits)) {
      return { digits: value.digits.slice(0, SIZE), lastSolved: value.lastSolved ?? null };
    }
  } catch {}
  return { digits: [], lastSolved: null };
}

function localDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function CuriosityTracker() {
  const raw = useSyncExternalStore(subscribe, readRaw, () => null);
  const { digits, lastSolved } = parse(raw);
  const full = digits.length >= SIZE;
  const solvedToday = lastSolved === localDate();
  const todayIndex = full || solvedToday ? -1 : digits.length;

  return (
    <section className="tracker" aria-labelledby="tracker-title">
      <div className="tracker-grid" role="img" aria-label={`${digits.length} of ${SIZE} squares filled`}>
        {Array.from({ length: SIZE }, (_, index) => (
          <span
            key={index}
            className={`tracker-cell${index === todayIndex ? " tracker-cell-today" : ""}`}
          >
            {digits[index] ?? (index === todayIndex ? "?" : "")}
          </span>
        ))}
      </div>
      <div className="tracker-copy">
        <h2 id="tracker-title" className="tracker-label">curiosity tracker</h2>
        <p className="tracker-count">
          {digits.length} / {SIZE}
        </p>
        <p className="tracker-help">{full ? "all nine squares filled" : "one square per puzzle"}</p>
        <Link className="tracker-link" href="/sudoku">
          {full || solvedToday ? "today's puzzle →" : "fill today's →"}
        </Link>
      </div>
    </section>
  );
}
