import type { Metadata } from "next";
import Image from "next/image";
import { InnerNav } from "@/components/InnerNav";
import { Spread } from "@/components/Spread";
import { mediaKit } from "@/content/mediaKit";

export const metadata: Metadata = {
  title: "Media kit: minutesbyisa",
  description: "The minutesbyisa media kit: audience, best-performing Reels and ways to work together.",
};

export default function MediaKitPage() {
  const kit = mediaKit;

  return (
    <>
      <InnerNav path={["projects", "media-kit"]} />
      <Spread
        className="spread-media-kit"
        left={
          <>
            <div className="kit-intro">
              <div>
                <p className="page-eyebrow">{kit.year}</p>
                <h1 className="page-title">{kit.name}</h1>
                <p className="kit-tagline">{kit.tagline}</p>
                <a className="kit-download" href={kit.pdf} download>
                  ↓ download the pdf
                </a>
              </div>
              <figure className="kit-photo">
                <span className="kit-photo-tape" aria-hidden="true" />
                <div className="kit-photo-frame">
                  <Image src={kit.photo.src} alt={kit.photo.alt} fill sizes="180px" loading="eager" />
                </div>
                <figcaption>{kit.photo.caption}</figcaption>
              </figure>
            </div>

            <section className="kit-card kit-about" aria-labelledby="kit-about">
              <span className="kit-tape" aria-hidden="true" />
              <h2 id="kit-about" className="kit-heading">
                about
              </h2>
              <p>{kit.about}</p>
            </section>

            <section className="kit-section" aria-labelledby="kit-numbers">
              <h2 id="kit-numbers" className="kit-heading">
                the numbers
              </h2>
              <ul className="kit-grid kit-grid-3">
                {kit.numbers.map((n) => (
                  <li key={n.label} className={`kit-card kit-stat tone-${n.tone}`}>
                    <strong>{n.value}</strong>
                    <span>{n.label}</span>
                  </li>
                ))}
              </ul>
              <p className="kit-source">{kit.numbersSource}</p>
            </section>

            <section className="kit-section" aria-labelledby="kit-audience">
              <h2 id="kit-audience" className="kit-heading">
                who watches
              </h2>
              <div className="kit-grid kit-grid-2">
                {kit.audience.map((group) => (
                  <div key={group.title} className="kit-card kit-bars">
                    <h3>{group.title}</h3>
                    <ul>
                      {group.rows.map((row) => (
                        <li key={row.label}>
                          <span>
                            {row.label}: {row.percent}%
                          </span>
                          <span className="kit-bar" aria-hidden="true">
                            <span style={{ width: `${row.percent}%` }} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="kit-source">{kit.audienceSource}</p>
            </section>
          </>
        }
        right={
          <>
            <section className="kit-section kit-section-first" aria-labelledby="kit-reels">
              <h2 id="kit-reels" className="kit-heading">
                what performs best
              </h2>
              <p className="kit-note">{kit.topReelsNote} Tap a card to watch.</p>
              <ul className="kit-grid kit-grid-reels">
                {kit.topReels.map((reel) => (
                  <li key={reel.href} className={reel.cover ? "kit-reel-has-cover" : undefined}>
                    <a
                      className={`kit-card kit-reel tone-${reel.tone}`}
                      href={reel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {reel.cover && (
                        <span className="kit-reel-cover">
                          <Image src={reel.cover.src} alt={reel.cover.alt} fill sizes="120px" />
                        </span>
                      )}
                      <span className="kit-reel-text">
                        <span className="kit-reel-views">
                          <strong>{reel.views}</strong> views
                        </span>
                        <span className="kit-reel-title">{reel.title}</span>
                        <span className="kit-reel-stats">{reel.stats}</span>
                        <span className="kit-reel-link">watch on Instagram →</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="kit-source">{kit.topReelsSource}</p>
            </section>

            <section className="kit-section" aria-labelledby="kit-makes">
              <h2 id="kit-makes" className="kit-heading">
                what I make
              </h2>
              <ul className="kit-grid kit-grid-3">
                {kit.makes.map((m) => (
                  <li key={m.title} className="kit-card kit-small">
                    <h3>{m.title}</h3>
                    <p>{m.text}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="kit-section" aria-labelledby="kit-offers">
              <h2 id="kit-offers" className="kit-heading">
                work with me
              </h2>
              <ul className="kit-grid kit-grid-2">
                {kit.offers.map((o) => (
                  <li key={o.title} className="kit-card kit-small kit-offer">
                    <h3>{o.title}</h3>
                    <p>{o.text}</p>
                    <p className="kit-price">{o.price}</p>
                  </li>
                ))}
              </ul>
              <p className="kit-note">{kit.offersNote}</p>
            </section>

            <section className="kit-card kit-contact" aria-labelledby="kit-contact">
              <span className="kit-tape" aria-hidden="true" />
              <div className="kit-contact-head">
                <h2 id="kit-contact" className="kit-heading">
                  let&apos;s make something
                </h2>
                <span className="kit-source">{kit.location}</span>
              </div>
              <ul>
                {kit.contact.map((c) => (
                  <li key={c.href}>
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                      <span className="contact-label">{c.label}</span>
                      <span className="contact-handle">{c.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a className="kit-download" href={kit.pdf} download>
                ↓ download the pdf
              </a>
            </section>
          </>
        }
      />
    </>
  );
}
