import Image from "next/image";
import { formatNotebookDate } from "@/lib/dates";
import type { SubstackPost } from "@/lib/substack";

type SubstackPostCardProps = {
  post: SubstackPost;
  index: number;
};

// A taped note for one Substack post: the cover as a print, the date, title and summary.
export function SubstackPostCard({ post, index }: SubstackPostCardProps) {
  return (
    <li className={`post-card post-card-${(index % 3) + 1}`}>
      <a href={post.url} target="_blank" rel="noopener noreferrer">
        <span className="post-tape" aria-hidden="true" />
        {post.cover && (
          <span className="post-print">
            <Image src={post.cover} alt={`Cover image for “${post.title}”`} fill sizes="(max-width: 1023px) 90vw, 440px" />
          </span>
        )}
        {post.date && (
          <time className="post-date" dateTime={post.date}>
            {formatNotebookDate(post.date)}
          </time>
        )}
        <span className="post-title">{post.title}</span>
        {post.summary && <span className="post-summary">{post.summary}</span>}
        <span className="post-read">read on substack →</span>
      </a>
    </li>
  );
}
