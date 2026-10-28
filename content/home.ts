export type SignifierKind = "task" | "event" | "note" | "important";

export type LogEntry = {
  kind: SignifierKind;
  text: string;
  // Optional: turns this phrase inside `text` into a link.
  link?: { text: string; href: string };
};

export type IndexSection = {
  kind: SignifierKind;
  label: string;
  sub: string;
  href: string;
  page: string;
};

// The date shown at the top of the log. Update it when you update the entries.
export const logDate = "2026-10-28";

export const greeting = "Hola, I'm Isabella.";

export const polaroid = {
  src: "/images/home/me-toronto-skyline.jpg",
  alt: "Isabella smiling on a grassy hill at dusk, with the Toronto skyline behind her.",
  caption: "me, toronto",
};

export const logEntries: LogEntry[] = [
  {
    kind: "note",
    text: "I love stories told through statistics, making real-life crafts, creating videos, solving sudoku, and feeding my brain new and interesting things.",
  },
  {
    kind: "task",
    text: "currently: building yarn visualizer and crocheting the Sophie Scarf",
    link: { text: "yarn visualizer", href: "https://yarn-visualizer-five.vercel.app/" },
  },
  { kind: "event", text: "last picture: Riverdale Park" },
];

export const indexSections: IndexSection[] = [
  { kind: "task", label: "projects", sub: "things I've built", href: "/projects", page: "p. 04" },
  { kind: "event", label: "gallery", sub: "pictures & fragments", href: "/gallery", page: "p. 12" },
  { kind: "note", label: "blog", sub: "pins & thoughts", href: "/blog", page: "p. 20" },
  { kind: "important", label: "about", sub: "a little context", href: "/about", page: "p. 32" },
];
