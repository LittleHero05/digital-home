import Image from "next/image";

type PolaroidProps = {
  src: string;
  alt: string;
  caption: string;
};

export function Polaroid({ src, alt, caption }: PolaroidProps) {
  return (
    <figure className="polaroid">
      <span className="polaroid-tape" aria-hidden="true" />
      <div className="polaroid-photo">
        <Image src={src} alt={alt} fill sizes="160px" loading="eager" />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
