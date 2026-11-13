// The minutesbyisa media kit, shown at /media-kit. Numbers come from Instagram Insights;
// update them here (and re-export the PDF in /public/files) when they change.

export type Tone = "yellow" | "pink" | "blue" | "paper";

export const mediaKit = {
  year: "media kit, 2026",
  name: "minutesbyisa",
  tagline: "hands-on learning, creative tech and handmade things",
  photo: {
    src: "/images/media-kit/isa.jpg",
    alt: "Isa smiling by a river in Zurich, with old buildings and a church spire behind her.",
    caption: "me, zurich",
  },
  pdf: "/files/minutesbyisa-media-kit.pdf",
  about:
    "Hi, I'm Isa. I'm a software engineering student in Toronto who builds AI and web tools, is passionate about learning everything she can and makes things by hand, from knitting and crochet to journaling. My content is for people who want to get into tech and who believe that feeding your brain leads somewhere good. I show the beginner's version, step by step, in simple lists and how-tos.",

  numbers: [
    { value: "15.0k", label: "accounts reached, last 28 days", tone: "yellow" },
    { value: "19.4k", label: "views, last 28 days", tone: "blue" },
    { value: "1.2k", label: "average views per Reel (48 Reels)", tone: "pink" },
  ] satisfies { value: string; label: string; tone: Tone }[],
  numbersSource:
    "Source: Instagram Insights, as of November 13, 2026. 1,318 accounts engaged and 1,814 interactions in the last 28 days.",

  audience: [
    {
      title: "age",
      rows: [
        { label: "25 to 34", percent: 41 },
        { label: "18 to 24", percent: 34 },
        { label: "35 to 44", percent: 11 },
        { label: "45 and over", percent: 13 },
      ],
    },
    {
      title: "gender",
      rows: [
        { label: "women", percent: 45 },
        { label: "men", percent: 22 },
        { label: "not specified", percent: 33 },
      ],
    },
  ],
  audienceSource: "Follower demographics from Instagram Insights, November 2026. Rounded to the nearest percent.",

  topReelsNote: "Numbered “3 things” lists and resource roundups. People save and share them.",
  topReels: [
    {
      views: "13.1k",
      title: "Media list: history, film and a book",
      stats: "1,261 saves, 237 shares, 10.7k reached",
      href: "https://www.instagram.com/reel/DePccx-R3sJ/",
      cover: {
        src: "/images/media-kit/cover.jpg",
        alt: "Cover of the media list Reel: Isa with pictures of Interstellar, a globe and a stack of books.",
      },
      tone: "pink",
    },
    {
      views: "7.0k",
      title: "3 simple things to build your own brain gym",
      stats: "451 saves, 221 shares, 6.0k reached",
      href: "https://www.instagram.com/reel/Dd6rHA0RX3n/",
      tone: "yellow",
    },
    {
      views: "5.4k",
      title: "3 things you need for your brain stack",
      stats: "106 saves, 62 shares, 4.4k reached",
      href: "https://www.instagram.com/reel/De2ROtiMSn9/",
      tone: "blue",
    },
    {
      views: "2.9k",
      title: "3 best brain bites I found this week",
      stats: "300 saves, 122 shares, 2.3k reached",
      href: "https://www.instagram.com/reel/DehKMWfxJek/",
      tone: "paper",
    },
  ] satisfies {
    views: string;
    title: string;
    stats: string;
    href: string;
    cover?: { src: string; alt: string };
    tone: Tone;
  }[],
  topReelsSource: "Source: Instagram Insights, lifetime numbers as of November 13, 2026.",

  makes: [
    { title: "creative tech", text: "AI tools, small apps and fast builds, shown start to finish." },
    { title: "hobbies", text: "Beginner journeys in knitting, crochet, piano, journaling and more." },
    { title: "intellectual depth", text: "Lists, how-tos and resource roundups for feeding your brain." },
  ],

  offers: [
    { title: "Reel", text: "A demo or list-style video featuring your product.", price: "from $75" },
    { title: "hand-drawn carousel", text: "A step-by-step carousel in my illustrated style.", price: "from $60" },
    { title: "YouTube", text: "A 60-second integration inside one of my videos.", price: "from $100" },
    { title: "package", text: "One Reel plus one carousel.", price: "from $120" },
  ],
  offersNote:
    "Best fit: AI and dev tools, creative tools, learning products, books, podcasts and craft brands. I only work with products I would use myself. Prices in CAD. Usage rights and extra revisions are quoted separately.",

  location: "Toronto, Canada",
  contact: [
    { label: "YouTube", handle: "@minutesbyisa", href: "https://www.youtube.com/@minutesbyisa" },
    { label: "Instagram", handle: "@minutesbyisa", href: "https://www.instagram.com/minutesbyisa/" },
    { label: "email", handle: "minutesbyisa@gmail.com", href: "mailto:minutesbyisa@gmail.com" },
  ],
};
