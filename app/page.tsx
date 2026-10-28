import Link from "next/link";
import { ContactFooter } from "@/components/ContactFooter";
import { CuriosityTracker } from "@/components/CuriosityTracker";
import { Polaroid } from "@/components/Polaroid";
import { Signifier } from "@/components/Signifier";
import { Spread } from "@/components/Spread";
import { formatNotebookDate } from "@/lib/dates";
import { greeting, indexSections, logDate, logEntries, polaroid } from "@/content/home";

export default function Home() {
  return (
    <>
      <Spread
        left={
          <div className="log-page">
            <span className="washi washi-home" aria-hidden="true" />
            <header className="log-header">
              <time className="log-date" dateTime={logDate}>
                {formatNotebookDate(logDate)}
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
                  <span>
                    {entry.link && entry.text.includes(entry.link.text) ? (
                      <>
                        {entry.text.split(entry.link.text)[0]}
                        <a href={entry.link.href} target="_blank" rel="noopener noreferrer">
                          {entry.link.text}
                        </a>
                        {entry.text.split(entry.link.text).slice(1).join(entry.link.text)}
                      </>
                    ) : (
                      entry.text
                    )}
                  </span>
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
      <ContactFooter />
    </>
  );
}
