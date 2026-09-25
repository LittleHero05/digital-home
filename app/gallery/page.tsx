import { InnerNav } from "@/components/InnerNav";
import { Spread } from "@/components/Spread";
import { gallery } from "@/content/gallery";

export default function GalleryPage() {
  return (
    <>
      <InnerNav path={["gallery"]} />
      <Spread
        left={
          <>
            <p className="page-eyebrow">pictures &amp; fragments</p>
            <h1 className="page-title">Gallery</h1>
            <p className="page-blurb">A place for photographs, collected light, and small visual records.</p>
          </>
        }
        right={
          <div className="gallery-grid">
            {gallery.map((item) => (
              <figure className="gallery-item" key={`${item.caption}-${item.date}`}>
                <div className={`gallery-placeholder ${item.tone}`} aria-label="Placeholder image" role="img" />
                <figcaption>
                  {item.caption} <span>{item.date}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        }
      />
    </>
  );
}