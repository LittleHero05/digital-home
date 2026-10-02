"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AboutCard } from "@/components/AboutCard";
import { SoftCutout } from "@/components/SoftCutout";
import type { AboutObject, Media } from "@/content/about";

type AboutBoardProps = {
  objects: AboutObject[];
};

const TITLE_ID = "about-card-title";

function MediaView({ media, sizes }: { media: Media; sizes: string }) {
  if (media.video) {
    return <video className="cutout-media" src={media.src} aria-label={media.alt} autoPlay muted loop playsInline />;
  }
  return <Image className="cutout-media" src={media.src} alt={media.alt} fill sizes={sizes} />;
}

// The scattered objects on the About spread: notes and cards open in a dialog,
// photo stacks flip to the next photo, and the rest just sit there.
export function AboutBoard({ objects }: AboutBoardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [flips, setFlips] = useState<Record<string, number>>({});

  const openObject = objects.find((object) => object.id === openId);
  const openCard = openObject && (openObject.type === "note" || openObject.type === "pixel") ? openObject.card : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (openCard && dialog && !dialog.open) dialog.showModal();
  }, [openCard]);

  function close() {
    dialogRef.current?.close();
  }

  function flip(id: string, total: number) {
    setFlips((current) => ({ ...current, [id]: ((current[id] ?? 0) + 1) % total }));
  }

  return (
    <div className={`about-objects${openId ? " has-open" : ""}`}>
      {objects.map((object) => {
        const style = {
          "--x": object.x,
          "--y": object.y,
          "--w": object.w,
          "--h": object.h,
          "--r": object.rotate,
        } as CSSProperties;
        const sizes = `${Math.round(object.w * 1.2)}px`;
        const className = `about-object about-object-${object.type}${object.id === openId ? " is-open" : ""}`;
        const tape = object.tape && (
          <span
            className={`about-tape about-tape-${object.tape.color}`}
            aria-hidden="true"
            style={{ "--tx": object.tape.x, "--ty": object.tape.y, "--tw": object.tape.w, "--tr": object.tape.rotate } as CSSProperties}
          />
        );
        const caption = object.caption && <span className="about-caption">{object.caption}</span>;

        if (object.type === "photo") {
          return (
            <figure key={object.id} className={className} style={style}>
              <SoftCutout id={object.id} shape={object.shape} width={object.w} height={object.h}>
                <MediaView media={object.photo} sizes={sizes} />
              </SoftCutout>
              {tape}
              <figcaption className="about-caption">{object.caption}</figcaption>
            </figure>
          );
        }

        if (object.type === "flip") {
          const index = flips[object.id] ?? 0;
          const total = object.media.length;
          return (
            <button
              key={object.id}
              type="button"
              className={className}
              style={style}
              aria-label={`${object.label}: ${index + 1} of ${total}. Show the next one.`}
              onClick={() => flip(object.id, total)}
            >
              <SoftCutout id={object.id} shape={object.shape} width={object.w} height={object.h} stack>
                <span key={index} className="cutout-flip">
                  <MediaView media={object.media[index]} sizes={sizes} />
                </span>
              </SoftCutout>
              <span className="about-counter" aria-hidden="true">
                {index + 1} / {total}
              </span>
              {caption}
            </button>
          );
        }

        if (object.type === "note") {
          return (
            <button
              key={object.id}
              type="button"
              className={className}
              style={style}
              aria-haspopup="dialog"
              aria-label={`Open note: ${object.card.title}`}
              onClick={() => setOpenId(object.id)}
            >
              <SoftCutout id={object.id} shape={object.shape} width={object.w} height={object.h}>
                <MediaView media={object.photo} sizes={sizes} />
              </SoftCutout>
              {tape}
              {caption}
            </button>
          );
        }

        return (
          <button
            key={object.id}
            type="button"
            className={className}
            style={style}
            aria-haspopup="dialog"
            aria-label={object.label}
            onClick={() => setOpenId(object.id)}
          >
            <Image className="about-pixel-art" src={object.art} alt="" width={object.w} height={object.h} />
            {caption}
          </button>
        );
      })}

      <dialog
        ref={dialogRef}
        className="about-dialog"
        aria-labelledby={TITLE_ID}
        onClose={() => setOpenId(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {openCard && <AboutCard card={openCard} titleId={TITLE_ID} onClose={close} />}
      </dialog>
    </div>
  );
}
