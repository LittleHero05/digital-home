import { substack } from "@/content/blog";

export type SubstackPost = {
  title: string;
  summary: string;
  url: string;
  date: string; // ISO date, YYYY-MM-DD
  cover?: string;
};

// How often (in seconds) the blog page fetches the feed again.
export const FEED_REVALIDATE = 3600;

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decode(text: string) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match);
}

function tag(item: string, name: string) {
  const match = item.match(new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`));
  return match ? decode(match[1].trim()) : "";
}

export function parseFeed(xml: string): SubstackPost[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items
    .map((item) => {
      const published = new Date(tag(item, "pubDate"));
      return {
        title: tag(item, "title"),
        summary: tag(item, "description"),
        url: tag(item, "link"),
        date: Number.isNaN(published.getTime()) ? "" : published.toISOString().slice(0, 10),
        cover: item.match(/<enclosure[^>]*url="([^"]+)"/)?.[1],
      };
    })
    .filter((post) => post.title && post.url.startsWith(substack.url));
}

// Returns null when the feed can't be reached, so the page can show a fallback.
export async function getSubstackPosts(): Promise<SubstackPost[] | null> {
  try {
    const response = await fetch(substack.feed, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; digital-home blog)" },
      next: { revalidate: FEED_REVALIDATE },
    });
    if (!response.ok) return null;
    return parseFeed(await response.text());
  } catch {
    return null;
  }
}
