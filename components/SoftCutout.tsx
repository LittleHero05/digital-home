import type { ReactNode } from "react";
import type { SoftShape } from "@/content/about";
import { softShapePath } from "@/lib/softShape";

type SoftCutoutProps = {
  id: string;
  shape: SoftShape;
  width: number;
  height: number;
  // Extra blank layers behind the face, so it reads as a small stack of photos.
  stack?: boolean;
  children: ReactNode;
};

export function SoftCutout({ id, shape, width, height, stack, children }: SoftCutoutProps) {
  const clipId = `soft-shape-${id}`;
  const clip = { clipPath: `url(#${clipId})` };

  return (
    <div className="cutout" style={{ aspectRatio: `${width} / ${height}` }}>
      <svg className="cutout-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <clipPath id={clipId} clipPathUnits="objectBoundingBox">
          <path d={softShapePath(shape, width, height)} />
        </clipPath>
      </svg>
      {stack && (
        <>
          <span className="cutout-stack cutout-stack-back" style={clip} />
          <span className="cutout-stack cutout-stack-middle" style={clip} />
        </>
      )}
      <div className="cutout-face" style={clip}>
        {children}
      </div>
    </div>
  );
}
