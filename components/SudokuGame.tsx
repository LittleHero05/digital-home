"use client";

import Link from "next/link";
import { useEffect, useReducer, useRef, useSyncExternalStore, type KeyboardEvent } from "react";
import { Spread } from "@/components/Spread";
import { daysBetween, formatNotebookDate, localIsoDate } from "@/lib/dates";
import { TRACKER_SIZE, parseTracker, readTrackerRaw, recordSolve, subscribeTracker } from "@/lib/curiosityTracker";
import { PEERS, boxOf, colOf, digitsInMask, parseGrid, rowOf, solve } from "@/lib/sudoku";

type SudokuGameProps = {
  puzzles: string[];
  startDate: string;
  difficulty: string;
};

type Snapshot = { entries: number[]; notes: number[] };

type GameState = {
  givens: number[];
  solution: number[];
  entries: number[]; // the visitor's numbers; 0 = empty
  notes: number[]; // pencil marks as bitmasks (bit 1–9)
  wrong: number[]; // squares flagged by the last "check my work"
  mistakes: number;
  seconds: number;
  solved: boolean;
  selected: number;
  pencil: boolean;
  history: Snapshot[];
};

type Action =
  | { type: "select"; cell: number }
  | { type: "move"; rows: number; cols: number }
  | { type: "input"; digit: number }
  | { type: "erase" }
  | { type: "undo" }
  | { type: "togglePencil" }
  | { type: "check" }
  | { type: "tick" };

const noopSubscribe = () => () => {};

function snapshot(state: GameState): Snapshot {
  return { entries: state.entries, notes: state.notes };
}

function isSolved(givens: number[], entries: number[], solution: number[]) {
  return solution.every((digit, cell) => (givens[cell] || entries[cell]) === digit);
}

function reducer(state: GameState, action: Action): GameState {
  const { selected, givens } = state;
  switch (action.type) {
    case "select":
      return { ...state, selected: action.cell };
    case "move": {
      const row = (rowOf(selected) + action.rows + 9) % 9;
      const col = (colOf(selected) + action.cols + 9) % 9;
      return { ...state, selected: row * 9 + col };
    }
    case "togglePencil":
      return { ...state, pencil: !state.pencil };
    case "tick":
      return state.solved ? state : { ...state, seconds: state.seconds + 1 };
    case "undo": {
      if (state.solved || state.history.length === 0) return state;
      const previous = state.history[state.history.length - 1];
      return { ...state, ...previous, wrong: [], history: state.history.slice(0, -1) };
    }
    case "check": {
      const wrong = state.entries.flatMap((digit, cell) => (digit && digit !== state.solution[cell] ? [cell] : []));
      return { ...state, wrong, mistakes: state.mistakes + wrong.length };
    }
    case "erase": {
      if (state.solved || givens[selected] || (!state.entries[selected] && !state.notes[selected])) return state;
      const entries = [...state.entries];
      const notes = [...state.notes];
      entries[selected] = 0;
      notes[selected] = 0;
      return { ...state, entries, notes, wrong: state.wrong.filter((c) => c !== selected), history: [...state.history, snapshot(state)].slice(-200) };
    }
    case "input": {
      if (state.solved || givens[selected]) return state;
      const { digit } = action;
      const entries = [...state.entries];
      const notes = [...state.notes];
      if (state.pencil) {
        if (entries[selected]) return state;
        notes[selected] ^= 1 << digit;
      } else {
        entries[selected] = entries[selected] === digit ? 0 : digit;
        notes[selected] = 0;
        // Placing a number clears that pencil mark from its row, column and box.
        if (entries[selected]) for (const peer of PEERS[selected]) notes[peer] &= ~(1 << digit);
      }
      return {
        ...state,
        entries,
        notes,
        wrong: state.wrong.filter((c) => c !== selected),
        solved: isSolved(givens, entries, state.solution),
        history: [...state.history, snapshot(state)].slice(-200),
      };
    }
  }
}

type Saved = { entries: string; notes: number[]; mistakes: number; seconds: number; solved: boolean };

function loadState(storageKey: string, puzzle: string): GameState {
  const givens = parseGrid(puzzle);
  const solution = parseGrid(solve(puzzle) ?? puzzle);
  const fresh: GameState = {
    givens,
    solution,
    entries: Array(81).fill(0),
    notes: Array(81).fill(0),
    wrong: [],
    mistakes: 0,
    seconds: 0,
    solved: false,
    selected: givens.findIndex((digit) => digit === 0),
    pencil: false,
    history: [],
  };
  try {
    const saved: Saved | null = JSON.parse(window.localStorage.getItem(storageKey) ?? "null");
    if (!saved || saved.entries.length !== 81) return fresh;
    return {
      ...fresh,
      entries: [...saved.entries].map((c) => (c === "." ? 0 : Number(c))),
      notes: saved.notes.length === 81 ? saved.notes : fresh.notes,
      mistakes: saved.mistakes ?? 0,
      seconds: saved.seconds ?? 0,
      solved: Boolean(saved.solved),
    };
  } catch {
    return fresh;
  }
}

const formatTime = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

function Board({ today, puzzle, puzzleNumber, difficulty }: { today: string; puzzle: string; puzzleNumber: number; difficulty: string }) {
  const storageKey = `sudoku-${today}`;
  const [state, dispatch] = useReducer(reducer, storageKey, (key) => loadState(key, puzzle));
  const cellRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const wasSolved = useRef(state.solved);
  const tracker = parseTracker(useSyncExternalStore(subscribeTracker, readTrackerRaw, () => null));

  const { givens, entries, notes, selected, solved } = state;
  const board = givens.map((digit, cell) => digit || entries[cell]);
  const filled = board.filter(Boolean).length;
  const placed = (digit: number) => board.filter((value) => value === digit).length;

  // Save progress for today.
  useEffect(() => {
    const saved: Saved = {
      entries: entries.map((d) => (d ? String(d) : ".")).join(""),
      notes,
      mistakes: state.mistakes,
      seconds: state.seconds,
      solved,
    };
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(saved));
    } catch {}
  }, [storageKey, entries, notes, state.mistakes, state.seconds, solved]);

  // Fill today's square in the curiosity tracker the moment the puzzle is solved.
  useEffect(() => {
    if (solved && !wasSolved.current) recordSolve(today, state.solution[40]);
    wasSolved.current = solved;
  }, [solved, today, state.solution]);

  // Clock: runs while the puzzle is open, visible and unsolved.
  useEffect(() => {
    if (solved) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") dispatch({ type: "tick" });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [solved]);

  // Keep keyboard focus on the selected square while moving with the arrow keys.
  useEffect(() => {
    const active = document.activeElement;
    if (active instanceof HTMLElement && active.dataset.cell !== undefined) cellRefs.current[selected]?.focus();
  }, [selected]);

  function onKeyDown(event: KeyboardEvent) {
    const moves: Record<string, [number, number]> = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
    if (moves[event.key]) {
      dispatch({ type: "move", rows: moves[event.key][0], cols: moves[event.key][1] });
    } else if (/^[1-9]$/.test(event.key)) {
      dispatch({ type: "input", digit: Number(event.key) });
    } else if (event.key === "Backspace" || event.key === "Delete" || event.key === "0") {
      dispatch({ type: "erase" });
    } else if (event.key.toLowerCase() === "p") {
      dispatch({ type: "togglePencil" });
    } else if (event.key.toLowerCase() === "z" && (event.metaKey || event.ctrlKey)) {
      dispatch({ type: "undo" });
    } else {
      return;
    }
    event.preventDefault();
  }

  const [day, month, year] = [today.slice(8, 10), today.slice(5, 7), today.slice(0, 4)];
  const solvedToday = tracker.lastSolved === today;
  const trackerToday = tracker.digits.length < TRACKER_SIZE && !solvedToday ? tracker.digits.length : -1;

  return (
    <Spread
      className="spread-sudoku"
      left={
        <div className="sudoku-left" onKeyDown={onKeyDown}>
          <p className="page-eyebrow">
            puzzle no. {String(puzzleNumber).padStart(3, "0")} · {difficulty}
          </p>
          <h1 className="page-title">{solved ? "Solved it." : "Today's sudoku"}</h1>
          <p className="sudoku-blurb">
            {solved
              ? "Today's square is filled in your curiosity tracker. A new puzzle shows up tomorrow."
              : "Solve it to fill today's square in your curiosity tracker. Pencil marks are welcome. It's a notebook, after all."}
          </p>

          <dl className="sudoku-stats">
            <div>
              <dt>time</dt>
              <dd>{formatTime(state.seconds)}</dd>
            </div>
            <div>
              <dt>filled</dt>
              <dd>{filled} / 81</dd>
            </div>
            <div>
              <dt>mistakes</dt>
              <dd>{state.mistakes}</dd>
            </div>
          </dl>

          {solved ? (
            <Link className="sudoku-button" href="/">
              ← back to the notebook
            </Link>
          ) : (
            <div className="sudoku-controls">
              <div>
                <p className="sudoku-label" id="pad-label">pick a number</p>
                <div className="sudoku-pad" role="group" aria-labelledby="pad-label">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => {
                    const done = placed(digit) >= 9;
                    return (
                      <button
                        key={digit}
                        type="button"
                        className={`sudoku-key${done ? " is-done" : ""}`}
                        aria-label={`${state.pencil ? "Pencil" : "Enter"} ${digit}${done ? ", all nine placed" : ""}`}
                        onClick={() => dispatch({ type: "input", digit })}
                      >
                        {digit}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="sudoku-tools">
                <button type="button" aria-pressed={state.pencil} onClick={() => dispatch({ type: "togglePencil" })}>
                  <span className="sudoku-tool-name">pencil marks · {state.pencil ? "on" : "off"}</span>
                  <span className="sudoku-tool-hint">jot candidates</span>
                </button>
                <button type="button" onClick={() => dispatch({ type: "erase" })}>
                  <span className="sudoku-tool-name">erase</span>
                  <span className="sudoku-tool-hint">clear a square</span>
                </button>
                <button type="button" onClick={() => dispatch({ type: "undo" })} disabled={state.history.length === 0}>
                  <span className="sudoku-tool-name">undo</span>
                  <span className="sudoku-tool-hint">take it back</span>
                </button>
                <button type="button" className="sudoku-button sudoku-check" onClick={() => dispatch({ type: "check" })}>
                  check my work
                </button>
                {state.wrong.length > 0 && (
                  <p className="sudoku-feedback" role="status">
                    {state.wrong.length} {state.wrong.length === 1 ? "square needs" : "squares need"} another look
                  </p>
                )}
              </div>
            </div>
          )}

          <section className="sudoku-tracker" aria-labelledby="mini-tracker-title">
            <div className="sudoku-tracker-grid" aria-hidden="true">
              {Array.from({ length: TRACKER_SIZE }, (_, index) => (
                <span
                  key={index}
                  className={
                    index === trackerToday ? "is-today" : solvedToday && index === tracker.digits.length - 1 ? "is-fresh" : undefined
                  }
                >
                  {tracker.digits[index] ?? (index === trackerToday ? "?" : "")}
                </span>
              ))}
            </div>
            <div>
              <h2 id="mini-tracker-title" className="sudoku-label">curiosity tracker</h2>
              <p className="sudoku-tracker-copy">
                {tracker.digits.length} / {TRACKER_SIZE} ·{" "}
                {solvedToday ? "today's square: filled!" : "today's square fills when you finish"}
              </p>
            </div>
          </section>
        </div>
      }
      right={
        <div className="sudoku-right" onKeyDown={onKeyDown}>
          <header className="sudoku-header">
            <time className="log-date" dateTime={today}>
              {formatNotebookDate(today)}
            </time>
            <span className="log-label">{solved ? "all 81 filled" : `row ${rowOf(selected) + 1} · column ${colOf(selected) + 1}`}</span>
          </header>

          <div className="sudoku-grid" role="group" aria-label="Sudoku grid. Use the arrow keys to move and 1 to 9 to fill a square.">
            {board.map((value, cell) => {
              const isGiven = givens[cell] !== 0;
              const isPeer = !solved && cell !== selected && (rowOf(cell) === rowOf(selected) || colOf(cell) === colOf(selected) || boxOf(cell) === boxOf(selected));
              const cellNotes = digitsInMask(notes[cell]);
              const classes = [
                "sudoku-cell",
                isGiven ? "is-given" : value ? "is-entry" : "",
                !solved && cell === selected ? "is-selected" : "",
                isPeer ? "is-peer" : "",
                state.wrong.includes(cell) ? "is-wrong" : "",
                colOf(cell) % 3 === 2 && colOf(cell) !== 8 ? "box-right" : "",
                rowOf(cell) % 3 === 2 && rowOf(cell) !== 8 ? "box-bottom" : "",
              ].filter(Boolean).join(" ");
              const label = isGiven
                ? `given ${value}`
                : value
                  ? `your ${value}`
                  : cellNotes.length
                    ? `pencil ${cellNotes.join(" ")}`
                    : "empty";
              return (
                <button
                  key={cell}
                  ref={(node) => {
                    cellRefs.current[cell] = node;
                  }}
                  type="button"
                  data-cell={cell}
                  className={classes}
                  tabIndex={cell === selected ? 0 : -1}
                  aria-label={`Row ${rowOf(cell) + 1}, column ${colOf(cell) + 1}: ${label}`}
                  onClick={() => dispatch({ type: "select", cell })}
                >
                  {value ? (
                    value
                  ) : cellNotes.length ? (
                    <span className="sudoku-notes" aria-hidden="true">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                        <span key={digit}>{cellNotes.includes(digit) ? digit : ""}</span>
                      ))}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <p className="sudoku-legend" aria-hidden="true">
            <b>4</b> given <i>4</i> yours <small>4 7</small> pencil
          </p>

          {solved ? (
            <div className="sudoku-stamp" aria-hidden="true">
              <strong>SOLVED</strong>
              <span>
                {day} · {month} · {year}
              </span>
            </div>
          ) : (
            <p className="sudoku-tip">tip: start with the rows and boxes that are almost full</p>
          )}
        </div>
      }
    />
  );
}

// Picks today's puzzle in the visitor's own time zone. Renders only in the browser,
// because both "today" and saved progress live there.
export function SudokuGame({ puzzles, startDate, difficulty }: SudokuGameProps) {
  const isBrowser = useSyncExternalStore(noopSubscribe, () => true, () => false);

  if (!isBrowser) {
    return (
      <Spread
        className="spread-sudoku"
        left={
          <>
            <p className="page-eyebrow">today&apos;s puzzle</p>
            <h1 className="page-title">Today&apos;s sudoku</h1>
          </>
        }
        right={<p className="sudoku-tip">opening the notebook…</p>}
      />
    );
  }

  const today = localIsoDate();
  const puzzleNumber = Math.max(1, daysBetween(startDate, today) + 1);
  const puzzle = puzzles[(puzzleNumber - 1) % puzzles.length];
  return <Board key={today} today={today} puzzle={puzzle} puzzleNumber={puzzleNumber} difficulty={difficulty} />;
}
