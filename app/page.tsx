import Link from "next/link";
import { CuriosityTracker } from "@/components/CuriosityTracker";
import { Polaroid } from "@/components/Polaroid";
import { Signifier } from "@/components/Signifier";
import { Spread } from "@/components/Spread";
import { greeting, indexSections, logDate, logEntries, polaroid } from "@/content/home";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// "2026-09-23" -> "Wed · 23.09.2026"
function formatLogDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const weekday = WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return `${weekday} · ${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`;
}

export default function Home() {
  return (
    <Spread
      left={
        <div className="log-page">
          <span className="washi washi-home" aria-hidden="true" />
          <header className="log-header">
            <time className="log-date" dateTime={logDate}>
              {formatLogDate(logDate)}
            </time>
            <span className="log-label">today&apos;s log</span>
          </header>

          <div className="greeting-row">
            <h1 className="greeting">{greeting}</h1>
            <Polaroid {...polaroid} />
          </div>

          <ul className="log-list">
            {logEntries.map((entry) => (
              <li key={entry.text}>
                <Signifier kind={entry.kind} />
                <span>{entry.text}</span>
              </li>
            ))}
          </ul>

          <CuriosityTracker />
        </div>
      }
      right={
        <div className="index-contents">
          <p className="page-eyebrow">p. 00 — contents</p>
          <h2 className="index-heading">Index</h2>
          <nav aria-label="Main navigation">
            <ul className="index-list">
              {indexSections.map((section) => (
                <li key={section.href}>
                  <Link className="index-row" href={section.href}>
                    <Signifier kind={section.kind} />
                    <span className="index-text">
                      <span className="index-label">{section.label}</span>
                      <span className="index-sub">{section.sub}</span>
                    </span>
                    <span className="index-leader" aria-hidden="true" />
                    <span className="index-page-number" aria-hidden="true">
                      {section.page}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="index-key-note">
            every dot, circle, dash and star on these pages means the same thing as the one next to it here.
          </p>
        </div>
      }
    />
  );
}
