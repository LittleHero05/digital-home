import Link from "next/link";

type ComingSoonProps = {
  section: string;
  title?: string;
  showBackLink?: boolean;
};

// A hand-drawn cloud outline for pages that are not finished yet.
export function ComingSoon({ section, title = "still drawing this page", showBackLink = true }: ComingSoonProps) {
  return (
    <div className="coming-soon">
      <svg className="coming-soon-cloud" viewBox="0 0 340 220" aria-hidden="true">
        <path
          className="coming-soon-sketch"
          d="M78 178 C34 180 20 128 58 116 C46 72 102 46 130 76 C146 30 218 28 230 80 C272 62 316 98 292 132 C326 146 314 184 274 184 Z"
          transform="translate(5 5)"
        />
        <path
          className="coming-soon-outline"
          d="M78 178 C34 180 20 128 58 116 C46 72 102 46 130 76 C146 30 218 28 230 80 C272 62 316 98 292 132 C326 146 314 184 274 184 Z"
        />
      </svg>
      <div className="coming-soon-text">
        <p className="coming-soon-title">{title}</p>
        <p className="coming-soon-note">{section} is on its way. come back soon.</p>
      </div>
      {showBackLink && (
        <Link className="coming-soon-link" href="/">
          ← back to the notebook
        </Link>
      )}
    </div>
  );
}
