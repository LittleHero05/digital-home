import Link from "next/link";

const links = [
  ["projects", "/projects"],
  ["gallery", "/gallery"],
  ["blog", "/blog"],
  ["about", "/about"],
] as const;

type InnerNavProps = {
  path: string[];
};

export function InnerNav({ path }: InnerNavProps) {
  return (
    <header className="inner-header">
      <nav aria-label="Section navigation" className="compact-nav">
        {links.map(([label, href]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">home</Link>
        {path.map((segment, index) => (
          <span className="breadcrumb-segment" key={segment}>
            <span aria-hidden="true">/</span>
            {index === path.length - 1 ? (
              <span aria-current="page">{segment}</span>
            ) : (
              <Link href={`/${path.slice(0, index + 1).join("/")}`}>{segment}</Link>
            )}
          </span>
        ))}
      </nav>
    </header>
  );
}