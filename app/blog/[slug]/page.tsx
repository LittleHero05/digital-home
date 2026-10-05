import { notFound } from "next/navigation";
import { InnerNav } from "@/components/InnerNav";
import { Spread } from "@/components/Spread";
import Post from "@/content/blog/first-note.mdx";
import { sectionsReady } from "@/content/site";

const posts = {
  "first-note": {
    Component: Post,
    frontmatter: {
      title: "A first note from the notebook",
      date: "[date]",
      tags: ["notes", "placeholder"],
    },
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];

  if (!post || !sectionsReady.blog) {
    notFound();
  }

  const PostContent = post.Component;

  return (
    <>
      <InnerNav path={["blog", slug]} />
      <Spread
        left={
          <>
            <p className="page-eyebrow">{post.frontmatter.date}</p>
            <h1 className="page-title">{post.frontmatter.title}</h1>
            <p className="post-tags">{post.frontmatter.tags.join(" / ")}</p>
            <div className="post-cover" aria-hidden="true" />
          </>
        }
        right={
          <article className="prose">
            <PostContent />
          </article>
        }
      />
    </>
  );
}