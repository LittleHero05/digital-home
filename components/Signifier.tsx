import type { SignifierKind } from "@/content/home";

type SignifierProps = {
  kind: SignifierKind;
};

// Bullet-journal signifiers: task = dot, event = circle, note = dash, important = star.
export function Signifier({ kind }: SignifierProps) {
  return (
    <svg className="signifier" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      {kind === "task" && <circle cx="8" cy="8" r="5" fill="currentColor" />}
      {kind === "event" && <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" />}
      {kind === "note" && <rect x="0" y="6.75" width="16" height="2.5" fill="currentColor" />}
      {kind === "important" && (
        <path
          d="M8 0.6l2.1 4.9 5.3.5-4 3.5 1.2 5.2L8 12 3.4 14.7l1.2-5.2-4-3.5 5.3-.5z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}
