// The curiosity tracker lives in the visitor's browser (localStorage).
// /sudoku writes to it when a daily puzzle is solved; the home page reads it.

export const TRACKER_SIZE = 9;
const STORAGE_KEY = "curiosity-tracker";
const CHANGE_EVENT = "curiosity-tracker-change";

export type TrackerState = {
  digits: number[];
  lastSolved: string | null;
  celebrated: boolean; // the one-time "tracker complete" animation has played
};

export function subscribeTracker(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function readTrackerRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function parseTracker(raw: string | null): TrackerState {
  try {
    const value = raw ? JSON.parse(raw) : null;
    if (value && Array.isArray(value.digits)) {
      return {
        digits: value.digits.slice(0, TRACKER_SIZE),
        lastSolved: value.lastSolved ?? null,
        celebrated: Boolean(value.celebrated),
      };
    }
  } catch {}
  return { digits: [], lastSolved: null, celebrated: false };
}

export function writeTracker(state: TrackerState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// Called when today's puzzle is solved: fills the next square (once per day) with `digit`.
export function recordSolve(today: string, digit: number) {
  const state = parseTracker(readTrackerRaw());
  if (state.lastSolved === today) return;
  const digits = state.digits.length < TRACKER_SIZE ? [...state.digits, digit] : state.digits;
  writeTracker({ ...state, digits, lastSolved: today });
}
