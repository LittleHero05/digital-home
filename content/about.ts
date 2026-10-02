// About page: a brain-dump spread. Text sits on the pages; everything else lives in
// the scattered objects. Positions are in a 1200×820 spread (x, y = the object's centre).

export type Media = {
  src: string;
  alt: string;
  video?: boolean;
};

// Soft "photo cut-out" shape: a rounded star (points, inner radius 0–1, corner roundness in px).
export type SoftShape = {
  points: number;
  inner: number;
  corner: number;
};

type Placement = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  caption: string;
  tape?: { x: number; y: number; w: number; rotate: number; color: "yellow" | "pink" };
};

export type NoteCard = { kind: "note"; title: string; paragraphs: string[]; extras?: { label: string; value: string }[] };
export type SongCard = { kind: "song"; title: string; artist: string; why: string; spotifyId: string };
export type VideoCard = {
  kind: "video";
  handle: string;
  profileUrl: string;
  // Paste a specific post here when you want to feature one, e.g.
  // { url: "https://www.instagram.com/reel/...", caption: "...", about: "..." }
  latest?: { url: string; caption: string; about: string };
};
export type BookCard = { kind: "book"; title: string; author: string; why: string; bookUrl: string; profileUrl: string };
export type ArticleCard = { kind: "article"; title: string; source: string; url: string; why: string };
export type LinksCard = { kind: "links"; links: { label: string; handle: string; href: string }[] };
export type Card = NoteCard | SongCard | VideoCard | BookCard | ArticleCard | LinksCard;

export type AboutObject =
  | (Placement & { type: "note"; shape: SoftShape; photo: Media; card: NoteCard })
  | (Placement & { type: "flip"; shape: SoftShape; label: string; media: Media[] })
  | (Placement & { type: "photo"; shape: SoftShape; photo: Media })
  | (Placement & { type: "pixel"; art: string; label: string; card: Exclude<Card, NoteCard> });

export const intro =
  "I am a creative tech who studied software engineering and is interested in anything that has a pattern, celebrates creativity and invites me to learn new things. My interests are scattered all around, like this page. You are very welcome to look around.";

export const quickFacts = [
  { label: "from", value: "Bogotá, Colombia" },
  { label: "now", value: "Toronto" },
  { label: "doing", value: "about to graduate from Software Engineering" },
  { label: "favourite word", value: "albaricoque" },
];

const goodreadsProfile = "https://www.goodreads.com/user/show/95939194-isabella";

export const aboutObjects: AboutObject[] = [
  {
    id: "me",
    type: "photo",
    x: 175,
    y: 600,
    w: 210,
    h: 260,
    rotate: -4,
    shape: { points: 10, inner: 0.86, corner: 22 },
    caption: "my roman empire is the roman empire",
    tape: { x: 0, y: -118, w: 90, rotate: 5, color: "yellow" },
    photo: {
      src: "/images/about/me-justme.jpeg",
      alt: "Isabella smiling in front of the Pantheon in Rome, on a sunny, busy square.",
    },
  },
  {
    id: "colombia",
    type: "note",
    x: 455,
    y: 490,
    w: 180,
    h: 150,
    rotate: 6,
    shape: { points: 5, inner: 0.72, corner: 22 },
    caption: "colombia · tap to open",
    photo: {
      src: "/images/about/me-colombia.jpeg",
      alt: "Isabella from behind, standing on a trail in front of a tall waterfall in green Colombian mountains.",
    },
    card: {
      kind: "note",
      title: "Colombia",
      paragraphs: [
        "I am from Bogotá, Colombia, but I grew up between the outskirts of the capital and the mountains of Boyacá. I spent my summers and weekends milking cows, playing with clay and eating the most delicious food.",
        "There is nothing I miss more than my people and a good arepa boyacense.",
      ],
    },
  },
  {
    id: "crafts",
    type: "flip",
    x: 445,
    y: 760,
    w: 190,
    h: 160,
    rotate: -8,
    shape: { points: 14, inner: 0.9, corner: 7 },
    caption: "crafts · tap to flip",
    label: "Crochet",
    media: [
      { src: "/images/about/crafts/IMG_0908.jpeg", alt: "Crocheted tulips in purple, orange and blue, in little woven pots on a table." },
      { src: "/images/about/crafts/33BD1F4A-A3DE-4FCA-8C76-32530066818B.jpeg", alt: "A crocheted Pokéball held up in front of a desk." },
      { src: "/images/about/crafts/IMG_7249.jpeg", alt: "A crocheted corn cob with green husks and little black eyes." },
      { src: "/images/about/crafts/IMG_9270.jpeg", alt: "A crocheted granny square with a blue flower and a red border, held next to the hook." },
      { src: "/images/about/crafts/crochet-bouquet.mp4", alt: "A short clip of a crocheted bouquet of blue, white and orange flowers.", video: true },
    ],
  },
  {
    id: "toronto",
    type: "note",
    x: 740,
    y: 405,
    w: 200,
    h: 257,
    rotate: -3,
    shape: { points: 9, inner: 0.62, corner: 18 },
    caption: "toronto · tap to open",
    tape: { x: 2, y: -104, w: 80, rotate: -6, color: "pink" },
    photo: {
      src: "/images/about/toronto.jpeg",
      alt: "Isabella smiling on a boat in Toronto's harbour, wearing a Colombia jersey, with the CN Tower and skyline behind her.",
    },
    card: {
      kind: "note",
      title: "Toronto",
      paragraphs: [
        "I moved to Toronto in 2023, and every day (except when it is completely covered in snow and the sun sets at 4pm) I find new places, people, parks, food and opportunities that make me fall more and more in love with this city and this country.",
      ],
      extras: [
        { label: "favourite spot right now", value: "Biidaasige Park" },
        { label: "food rec", value: "Serano Bakery" },
      ],
    },
  },
  {
    id: "currently",
    type: "photo",
    x: 955,
    y: 410,
    w: 170,
    h: 160,
    rotate: 4,
    shape: { points: 8, inner: 0.78, corner: 16 },
    caption: "currently: content creation, sudokus, reviving old tech projects & long fall walks",
    photo: {
      src: "/images/about/current.jpeg",
      alt: "An orange fall sunset over a city street lined with shops and trees.",
    },
  },
  {
    id: "food",
    type: "flip",
    x: 970,
    y: 645,
    w: 160,
    h: 150,
    rotate: 5,
    shape: { points: 4, inner: 0.8, corner: 26 },
    caption: "food · tap to flip",
    label: "Food",
    media: [
      { src: "/images/about/food/IMG_6583.jpeg", alt: "A Colombian-style platter with sausage, avocado, rice, beans and grilled meat." },
      { src: "/images/about/food/DSC05363.jpeg", alt: "A table full of shared dishes: pizza, pasta, soup and salads." },
      { src: "/images/about/food/IMG_0574.jpeg", alt: "Two long plates of sushi rolls next to a glass of beer." },
      { src: "/images/about/food/IMG_1286.jpeg", alt: "A pot of seafood stew with shrimp, on a set table." },
      { src: "/images/about/food/IMG_6144.jpeg", alt: "A chocolate ice-cream dessert decorated with a cone hat and candy eyes." },
      { src: "/images/about/food/IMG_7029.jpeg", alt: "A charcuterie board with cheeses, cured-meat roses, grapes and nuts." },
    ],
  },
  {
    id: "statistics",
    type: "pixel",
    x: 0,
    y: 560,
    w: 120,
    h: 164,
    rotate: 0,
    art: "/images/about/pixel/clipboard.svg",
    label: "Statistics: an article I loved",
    caption: "statistics · an article I loved",
    card: {
      kind: "article",
      title: "Flavor network and the principles of food pairing",
      source: "Scientific Reports · 2011",
      url: "https://www.nature.com/articles/srep00196",
      why: "Ingredients, and how much we like them paired together, can be described with numbers, networks and data.",
    },
  },
  {
    id: "music",
    type: "pixel",
    x: 725,
    y: 650,
    w: 176,
    h: 176,
    rotate: 0,
    art: "/images/about/pixel/ipod.svg",
    label: "Music: my current favourite song",
    caption: "music · on repeat",
    card: {
      kind: "song",
      title: "BBY ROMEO",
      artist: "rusowsky",
      why: "There is something about the strings, or the melody, that makes it so unique.",
      spotifyId: "0sVAsg0GP4JZHKn1Ohsiw0",
    },
  },
  {
    id: "camera",
    type: "pixel",
    x: 1150,
    y: 335,
    w: 160,
    h: 104,
    rotate: 0,
    art: "/images/about/pixel/camera.svg",
    label: "Camera: my latest video",
    caption: "camera · my latest video",
    card: { kind: "video", handle: "@minutesbyisa", profileUrl: "https://www.instagram.com/minutesbyisa" },
  },
  {
    id: "book",
    type: "pixel",
    x: 1080,
    y: 67,
    w: 120,
    h: 144,
    rotate: 0,
    art: "/images/about/pixel/book.svg",
    label: "Book: a book I recommend",
    caption: "book · what I'm reading",
    card: {
      kind: "book",
      title: "Rules of Civility",
      author: "Amor Towles",
      why: "How I imagine ambition, class and the chase for identity looked for a woman in 1940s New York.",
      bookUrl: "https://www.goodreads.com/search?q=Rules+of+Civility+Amor+Towles",
      profileUrl: goodreadsProfile,
    },
  },
  {
    id: "links",
    type: "pixel",
    x: 1120,
    y: 775,
    w: 152,
    h: 128,
    rotate: 0,
    art: "/images/about/pixel/envelope.svg",
    label: "Links: find me elsewhere",
    caption: "links · find me",
    card: {
      kind: "links",
      links: [
        { label: "instagram", handle: "@minutesbyisa", href: "https://www.instagram.com/minutesbyisa" },
        { label: "goodreads", handle: "isabella", href: goodreadsProfile },
        { label: "github", handle: "@LittleHero05", href: "https://github.com/LittleHero05" },
        { label: "linkedin", handle: "isabella porras", href: "https://www.linkedin.com/in/isabella-porras-134b2a295/" },
        { label: "email", handle: "minutesbyisa@gmail.com", href: "mailto:minutesbyisa@gmail.com" },
      ],
    },
  },
];
