import type { ReactNode } from "react";

type SpreadProps = {
  left: ReactNode;
  right: ReactNode;
  // Optional layer that sits on top of both pages (e.g. the About page objects).
  overlay?: ReactNode;
  className?: string;
};

export function Spread({ left, right, overlay, className }: SpreadProps) {
  return (
    <main className={className ? `spread-shell ${className}` : "spread-shell"}>
      <section className="spread-page spread-page-left">{left}</section>
      <div className="spread-spine" aria-hidden="true" />
      <section className="spread-page spread-page-right">{right}</section>
      {overlay}
    </main>
  );
}
