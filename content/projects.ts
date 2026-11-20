export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  status: string; // e.g. "in progress · 2026"
  subtitle?: string;
  award?: boolean;
  blurb: string;
  tech: string[];
  image: {
    src: string;
    alt: string;
    position?: string; // CSS object-position, to choose which part of the image shows
  };
  links: ProjectLink[];
};

// Shown in this order: the first two on the left page, the rest on the right.
export const projects: Project[] = [
  {
    id: "outlyne",
    title: "Outlyne",
    status: "launched · 2026",
    blurb:
      "Running-app overlays, but for everything else. Pick an activity (reading, a workout, a habit, a recipe), fill in the details, and get a clean overlay to share in your story.",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Supabase", "html-to-image"],
    image: {
      src: "/images/projects/outlyne.png",
      alt: "Outlyne's overlay editor: a reading overlay for “Hollywood ending” with pages, time, pace and rating, and outline colours to choose from.",
      position: "50% 38%",
    },
    links: [
      { label: "visit the site", href: "https://outlyneapp.com" },
      { label: "github", href: "https://github.com/LittleHero05/outlyne-app" },
    ],
  },
  {
    id: "hackathon",
    title: "Research Excellence Award",
    subtitle: "Microsoft × OPS Hackathon 2025",
    status: "award · 2025",
    award: true,
    blurb:
      "With a team of five, we turned Ontario's crime data into dashboards for understanding trends across municipalities, types of violations and youth crime. We were given one massive dataset, so I did the research: deciding what was valuable, what needed cleaning, and how to present the differences between communities.",
    tech: ["Power BI (Microsoft Fabric)", "Power Query", "SQL", "Python", "research", "presentation"],
    image: {
      src: "/images/projects/hackathon-award.webp",
      alt: "The Research Excellence Award trophy: a small rainbow-coloured robot in a cape on a plinth, standing by a window.",
      position: "50% 32%",
    },
    links: [{ label: "read the report (pdf)", href: "/files/ontario-crime-report.pdf" }],
  },
  {
    id: "swatch-journal",
    title: "Swatch Journal",
    subtitle: "yarn project visualizer",
    status: "in progress · 2026",
    blurb:
      "Plan a sweater in real yarn colours before you buy. Search a Ravelry pattern, choose the yarn weight, fibre and a palette, pick a size and fit, and it sketches the sweater and estimates how many skeins you'll need.",
    tech: ["React", "TypeScript", "Vite", "Zustand", "Ravelry API", "Vercel functions", "Vercel Blob", "Vitest", "Figma"],
    image: {
      src: "/images/projects/swatch-journal.png",
      alt: "Swatch Journal planning the Olga Sweater in DK wool: the pattern and yarn options next to a sketch of a green and orange striped sweater.",
      position: "50% 20%",
    },
    links: [
      { label: "visit the site", href: "https://yarn-visualizer-five.vercel.app" },
      { label: "github", href: "https://github.com/LittleHero05/YarnVisualizer" },
    ],
  },
  {
    id: "bookify",
    title: "Bookify",
    subtitle: "goodreads library visualizer",
    status: "2024",
    blurb:
      "Upload your Goodreads export and see your reading trends, favourite authors, ratings and shelves, laid out like a Hobonichi Weeks planner.",
    tech: ["Python", "Flask", "pandas", "Plotly"],
    image: {
      src: "/images/projects/bookify.png",
      alt: "Bookify's start page: a notebook-style card asking you to upload your Goodreads CSV export to visualize your library.",
      position: "50% 30%",
    },
    links: [
      { label: "visit the site", href: "https://bookify-taupe.vercel.app" },
      { label: "github", href: "https://github.com/LittleHero05/bookify" },
    ],
  },
  {
    id: "minutesbyisa",
    title: "minutesbyisa",
    subtitle: "personal brand & content creation",
    status: "ongoing · 2026",
    blurb:
      "Short videos and hand-drawn carousels about getting into tech, learning for fun and making things by hand: the beginner's version, step by step, in simple lists and how-tos.",
    tech: ["Instagram Reels", "YouTube", "hand-drawn carousels", "Instagram Insights"],
    image: {
      src: "/images/projects/minutesbyisa-reels.webp",
      alt: "A grid of six minutesbyisa Reels: starting a junk journal, apps for a better online experience, wildly different activities to try, keeping your brain healthy, fixing a scrolling addiction, and a book review.",
      position: "50% 0%",
    },
    links: [
      { label: "see the media kit", href: "/media-kit" },
      { label: "instagram", href: "https://www.instagram.com/minutesbyisa/" },
      { label: "youtube", href: "https://www.youtube.com/@minutesbyisa" },
    ],
  },
];
