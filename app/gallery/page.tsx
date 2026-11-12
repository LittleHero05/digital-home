import { ComingSoon } from "@/components/ComingSoon";
import { GalleryFolder } from "@/components/GalleryFolder";
import { InnerNav } from "@/components/InnerNav";
import { Spread } from "@/components/Spread";
import { albums } from "@/content/gallery";
import { sectionsReady } from "@/content/site";

export default function GalleryPage() {
  return (
    <>
      <InnerNav path={["gallery"]} />
      <Spread
        className="spread-gallery"
        left={
          <>
            <p className="page-eyebrow">pictures &amp; fragments</p>
            <h1 className="page-title">Gallery</h1>
            <p className="page-blurb">A place for photographs, collected light, and small visual records.</p>
          </>
        }
        right={
          sectionsReady.gallery ? (
            <div className="gallery-key">
              <p className="page-eyebrow">in this folder</p>
              <ol>
                {albums.map((album, index) => (
                  <li key={album.id}>
                    <span className="gallery-key-number">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <strong>{album.label}</strong> {album.description}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="gallery-hint">(pick a tab on the folder below, and click any photo to see it bigger)</p>
            </div>
          ) : (
            <ComingSoon section="the gallery" />
          )
        }
        overlay={
          sectionsReady.gallery ? (
            <div className="gallery-folder-slot">
              <GalleryFolder albums={albums} />
            </div>
          ) : undefined
        }
      />
    </>
  );
}
