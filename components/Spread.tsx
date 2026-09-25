import type { ReactNode } from "react";

type SpreadProps = {
  left: ReactNode;
  right: ReactNode;
};

export function Spread({ left, right }: SpreadProps) {
  return (
    <main className="spread-shell">
      <section className="spread-page spread-page-left">{left}</section>
      <div className="spread-spine" aria-hidden="true" />
      <section className="spread-page spread-page-right">{right}</section>
    </main>
  );
}