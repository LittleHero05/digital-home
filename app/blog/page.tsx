import { ComingSoon } from "@/components/ComingSoon";
import { InnerNav } from "@/components/InnerNav";
import { Spread } from "@/components/Spread";
import { SubstackPostCard } from "@/components/SubstackPostCard";
import { substack } from "@/content/blog";
import { sectionsReady } from "@/content/site";
import { getSubstackPosts } from "@/lib/substack";

// Fetch the Substack feed again at most once an hour, so new posts show up without a deploy.
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = sectionsReady.blog ? await getSubstackPosts() : null;

  return (
    <>
      <InnerNav path={["blog"]} />
      <Spread
        className="spread-blog"
        left={
          <>
            <p className="page-eyebrow">notes from the margins</p>
            <h1 className="page-title">Blog</h1>
            <p className="page-blurb">Writing about the things that keep tugging at my attention.</p>
            {sectionsReady.blog && (
              <section className="subscribe-card" aria-labelledby="subscribe-title">
                <span className="subscribe-tape" aria-hidden="true" />
                <h2 id="subscribe-title">get new posts by email</h2>
                <p>I write on Substack. Subscribe there and new posts land in your inbox.</p>
                <iframe
                  className="subscribe-embed"
                  src={`${substack.url}/embed`}
                  title="Subscribe to minutesbyisa on Substack"
                  scrolling="no"
                />
              </section>
            )}
          </>
        }
        right={
          !sectionsReady.blog ? (
            <ComingSoon section="the first post" />
          ) : posts && posts.length > 0 ? (
            <>
              <ul className="post-list">
                {posts.map((post, index) => (
                  <SubstackPostCard key={post.url} post={post} index={index} />
                ))}
              </ul>
              <p className="post-more">
                <a href={substack.url} target="_blank" rel="noopener noreferrer">
                  everything on substack →
                </a>
              </p>
            </>
          ) : (
            <div className="post-fallback">
              <p>The posts couldn&apos;t load right now.</p>
              <a href={substack.url} target="_blank" rel="noopener noreferrer">
                read them on substack →
              </a>
            </div>
          )
        }
      />
    </>
  );
}
