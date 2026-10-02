import Image from "next/image";
import type { ReactNode } from "react";
import type { Card } from "@/content/about";

type AboutCardProps = {
  card: Card;
  titleId: string;
  onClose: () => void;
};

function External({ href, children }: { href: string; children: ReactNode }) {
  const isMail = href.startsWith("mailto:");
  return (
    <a className="card-link" href={href} {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
      {children}
    </a>
  );
}

// The taped, ruled index card that opens from an object on the About page.
export function AboutCard({ card, titleId, onClose }: AboutCardProps) {
  const eyebrow = {
    note: card.kind === "note" ? card.title.toLowerCase() : "",
    song: "on repeat",
    video: "latest video",
    book: "reading",
    article: "article",
    links: "elsewhere",
  }[card.kind];

  return (
    <article className="index-card">
      <span className="index-card-tape" aria-hidden="true" />
      <header className="index-card-header">
        <span className="index-card-eyebrow">note · {eyebrow}</span>
        <button type="button" className="index-card-close" onClick={onClose}>
          × close
        </button>
      </header>

      {card.kind === "note" && (
        <>
          <h2 id={titleId}>{card.title}</h2>
          {card.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {card.extras && (
            <dl className="index-card-extras">
              {card.extras.map((extra) => (
                <div key={extra.label}>
                  <dt>{extra.label}</dt>
                  <dd>{extra.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </>
      )}

      {card.kind === "song" && (
        <>
          <h2 id={titleId}>Current favourite song</h2>
          <p className="index-card-strong">
            {card.title} <span>· {card.artist}</span>
          </p>
          <iframe
            className="index-card-embed"
            title={`Spotify player: ${card.title} by ${card.artist}`}
            src={`https://open.spotify.com/embed/track/${card.spotifyId}?utm_source=generator`}
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
          <p>why it&apos;s on repeat: {card.why}</p>
          <External href={`https://open.spotify.com/track/${card.spotifyId}`}>listen on spotify →</External>
        </>
      )}

      {card.kind === "video" && (
        <>
          <h2 id={titleId}>On my Instagram</h2>
          {card.latest ? (
            <>
              <p className="index-card-strong">{card.latest.caption}</p>
              <p>{card.latest.about}</p>
              <External href={card.latest.url}>watch on instagram →</External>
            </>
          ) : (
            <>
              <p>
                I post short videos as <strong>{card.handle}</strong>. The newest one is always at the top of my
                profile.
              </p>
              <External href={card.profileUrl}>watch on instagram →</External>
            </>
          )}
        </>
      )}

      {card.kind === "book" && (
        <>
          <h2 id={titleId}>A book I recommend</h2>
          <div className="index-card-book">
            <Image src="/images/about/pixel/book.svg" alt="" width={60} height={72} />
            <div>
              <p className="index-card-strong">{card.title}</p>
              <p className="index-card-meta">{card.author}</p>
            </div>
          </div>
          <p>why I recommend it: {card.why}</p>
          <External href={card.bookUrl}>this book on goodreads →</External>
          <External href={card.profileUrl}>everything I&apos;m reading →</External>
        </>
      )}

      {card.kind === "article" && (
        <>
          <h2 id={titleId}>{card.title}</h2>
          <p className="index-card-meta">{card.source}</p>
          <div className="index-card-chart" aria-hidden="true">
            {[48, 82, 34, 100, 64, 22].map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} className={index === 3 ? "is-marked" : undefined} />
            ))}
          </div>
          <p>why it stuck with me: {card.why}</p>
          <External href={card.url}>read the article →</External>
        </>
      )}

      {card.kind === "links" && (
        <>
          <h2 id={titleId}>Find me here</h2>
          <ul className="index-card-links">
            {card.links.map((link) => (
              <li key={link.label}>
                <External href={link.href}>
                  <span className="index-card-links-label">{link.label}</span>
                  <span className="index-card-links-leader" aria-hidden="true" />
                  <span className="index-card-links-handle">{link.handle}</span>
                </External>
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
