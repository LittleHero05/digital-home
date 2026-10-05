"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { localIsoDate } from "@/lib/dates";
import { TRACKER_SIZE, parseTracker, readTrackerRaw, subscribeTracker, writeTracker } from "@/lib/curiosityTracker";

const CELEBRATION_MS = 520; // matches the tracker-pop animation in globals.css
const CELEBRATION_STAGGER_MS = 90;

export function CuriosityTracker() {
  const raw = useSyncExternalStore(subscribeTracker, readTrackerRaw, () => null);
  const state = parseTracker(raw);
  const { digits, lastSolved } = state;
  const full = digits.length >= TRACKER_SIZE;
  const solvedToday = lastSolved === localIsoDate();
  const todayIndex = full || solvedToday ? -1 : digits.length;
  // When the ninth square is filled, play a small animation once; after that it just stays full.
  const celebrating = full && !state.celebrated;

  useEffect(() => {
    if (!celebrating) return;
    // Long enough for the last square's pop to finish; then remember it has played.
    const timer = window.setTimeout(() => {
      const latest = parseTracker(readTrackerRaw());
      writeTracker({ ...latest, celebrated: true });
    }, TRACKER_SIZE * CELEBRATION_STAGGER_MS + CELEBRATION_MS);
    return () => window.clearTimeout(timer);
  }, [celebrating]);

  return (
    <section className="tracker" aria-labelledby="tracker-title">
      <div
        className={`tracker-grid${celebrating ? " is-celebrating" : ""}`}
        role="img"
        aria-label={`${digits.length} of ${TRACKER_SIZE} squares filled`}
      >
        {Array.from({ length: TRACKER_SIZE }, (_, index) => (
          <span
            key={index}
            className={`tracker-cell${index === todayIndex ? " tracker-cell-today" : ""}`}
            style={{ animationDelay: `${index * CELEBRATION_STAGGER_MS}ms` }}
          >
            {digits[index] ?? (index === todayIndex ? "?" : "")}
          </span>
        ))}
      </div>
      <div className="tracker-copy">
        <h2 id="tracker-title" className="tracker-label">curiosity tracker</h2>
        <p className="tracker-count">
          {digits.length} / {TRACKER_SIZE}
        </p>
        <p className="tracker-help">{full ? "all nine squares filled" : "one square per puzzle"}</p>
        <Link className="tracker-link" href="/sudoku">
          {full || solvedToday ? "today's puzzle →" : "fill today's →"}
        </Link>
      </div>
    </section>
  );
}
