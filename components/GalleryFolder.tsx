"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ComingSoon } from "@/components/ComingSoon";
import type { Album, PhotoTile } from "@/content/gallery";

type GalleryFolderProps = {
  albums: Album[];
};

const TILE_SIZES: Record<string, string> = {
  tall: "(max-width: 700px) 50vw, 300px",
  wide: "(max-width: 700px) 100vw, 600px",
  big: "(max-width: 700px) 100vw, 600px",
};

function Media({ tile, sizes, controls = false }: { tile: PhotoTile; sizes: string; controls?: boolean }) {
  if (tile.video) {
    return (
      <video
        className="album-media"
        src={tile.src}
        aria-label={tile.alt}
        autoPlay
        muted
        loop
        playsInline
        controls={controls}
      />
    );
  }
  return (
    <Image
      className="album-media"
      src={tile.src}
      alt={tile.alt}
      fill
      sizes={sizes}
      style={tile.position ? { objectPosition: tile.position } : undefined}
    />
  );
}

// A folder with a tab per album. Each album is a bento grid of photos and notes;
// clicking a photo opens it larger, with arrows to move through the album.
export function GalleryFolder({ albums }: GalleryFolderProps) {
  const [activeId, setActiveId] = useState(albums[0].id);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const album = albums.find((a) => a.id === activeId) ?? albums[0];
  const photos = album.sections.flatMap((section) => section.tiles.filter((t): t is PhotoTile => t.kind === "photo"));
  const open = openIndex === null ? null : photos[openIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
  }, [open]);

  function selectTab(index: number) {
    const next = (index + albums.length) % albums.length;
    setActiveId(albums[next].id);
    tabRefs.current[next]?.focus();
  }

  function onTabKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === "ArrowRight") selectTab(index + 1);
    else if (event.key === "ArrowLeft") selectTab(index - 1);
    else if (event.key === "Home") selectTab(0);
    else if (event.key === "End") selectTab(albums.length - 1);
    else return;
    event.preventDefault();
  }

  function step(delta: number) {
    setOpenIndex((current) => (current === null ? current : (current + delta + photos.length) % photos.length));
  }

  let photoCounter = 0;

  return (
    <div className="gallery-folder">
      <div className="folder-tabs" role="tablist" aria-label="Albums">
        {albums.map((a, index) => {
          const selected = a.id === album.id;
          return (
            <button
              key={a.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`tab-${a.id}`}
              aria-selected={selected}
              aria-controls={`album-${a.id}`}
              tabIndex={selected ? 0 : -1}
              className={`folder-tab${selected ? " is-active" : ""}`}
              onClick={() => setActiveId(a.id)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
            >
              {a.label}
            </button>
          );
        })}
      </div>

      <div className="folder-body" role="tabpanel" id={`album-${album.id}`} aria-labelledby={`tab-${album.id}`}>
        {album.sections.length === 0 && (
          <ComingSoon section="this album" title={album.placeholder ?? "still filling this album"} showBackLink={false} />
        )}
        {album.sections.map((section) => (
          <section key={section.title ?? section.tiles.length} className="album-section">
            {section.title && (
              <header className="album-section-header">
                <h2>{section.title}</h2>
                {section.subtitle && <span>{section.subtitle}</span>}
              </header>
            )}
            <div className="album-grid">
              {section.tiles.map((tile, tileIndex) => {
                if (tile.kind === "note") {
                  return (
                    <div key={`note-${tileIndex}`} className={`album-tile tile-${tile.size} album-note note-${tile.tone}`}>
                      {tile.title && <h3>{tile.title}</h3>}
                      <p>{tile.text}</p>
                    </div>
                  );
                }
                const index = photoCounter++;
                return (
                  <button
                    key={tile.src}
                    type="button"
                    className={`album-tile tile-${tile.size} album-photo`}
                    aria-haspopup="dialog"
                    aria-label={`Open ${tile.video ? "video" : "photo"}: ${tile.alt}`}
                    onClick={() => setOpenIndex(index)}
                  >
                    <Media tile={tile} sizes={TILE_SIZES[tile.size]} />
                    {tile.caption && <span className="album-caption">{tile.caption}</span>}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="album-lightbox"
        aria-label={open ? open.alt : "Photo"}
        onClose={() => setOpenIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          else if (event.key === "ArrowLeft") step(-1);
        }}
      >
        {open && openIndex !== null && (
          <figure className="lightbox-figure">
            <div className="lightbox-media">
              <Media key={open.src} tile={open} sizes="(max-width: 1100px) 92vw, 1000px" controls />
            </div>
            <figcaption className="lightbox-caption">
              <span>{open.caption ?? ""}</span>
              <span className="lightbox-count">
                {openIndex + 1} / {photos.length}
              </span>
            </figcaption>
            <div className="lightbox-controls">
              <button type="button" onClick={() => step(-1)} aria-label="Previous photo">
                ← prev
              </button>
              <button type="button" onClick={() => dialogRef.current?.close()}>
                × close
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next photo">
                next →
              </button>
            </div>
          </figure>
        )}
      </dialog>
    </div>
  );
}
