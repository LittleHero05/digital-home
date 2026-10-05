import Link from "next/link";
import { InnerNav } from "@/components/InnerNav";
import { ComingSoon } from "@/components/ComingSoon";
import { Spread } from "@/components/Spread";
import { sectionsReady } from "@/content/site";

export default function BlogPage() {
  return (
    <>
      <InnerNav path={["blog"]} />
      <Spread
        left={
          <>
            <p className="page-eyebrow">notes from the margins</p>
            <h1 className="page-title">Blog</h1>
            <p className="page-blurb">Writing about the things that keep tugging at my attention.</p>
          </>
        }
        right={
          sectionsReady.blog ? (
            <div className="post-list">
              <Link className="post-link" href="/blog/first-note">
                <span className="post-date">[date]</span>
                <span className="post-title">A first note from the notebook</span>
                <span className="post-summary">A clearly marked placeholder for the first real post.</span>
              </Link>
            </div>
          ) : (
            <ComingSoon section="the first post" />
          )
        }
      />
    </>
  );
}