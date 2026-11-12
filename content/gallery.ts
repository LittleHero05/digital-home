// The gallery is a folder with tabs (albums). Each album has sections, and each section is a
// bento grid of tiles. Tile sizes on a 12-column grid: tall = 3×4, wide = 6×4, big = 6×8.
// A row of the grid is 4 "units" wide (tall = 1, wide = 2, big = 4 across two rows), so
// sections look tidy when their units add up to a multiple of 4.

export type TileSize = "tall" | "wide" | "big";

export type PhotoTile = {
  kind: "photo";
  src: string;
  alt: string;
  caption?: string;
  size: TileSize;
  video?: boolean;
  position?: string; // CSS object-position, to choose which part of the photo shows
};

export type NoteTile = {
  kind: "note";
  title?: string;
  text: string;
  tone: "yellow" | "pink" | "blue";
  size: "tall" | "wide";
};

export type GalleryTile = PhotoTile | NoteTile;

export type GallerySection = {
  title?: string;
  subtitle?: string;
  tiles: GalleryTile[];
};

export type Album = {
  id: string;
  label: string;
  description: string; // shown in the "in this folder" list
  sections: GallerySection[];
  // Shown instead of sections while an album has no photos yet.
  placeholder?: string;
};

const g = (file: string) => `/images/gallery/${file}`;

export const albums: Album[] = [
  {
    id: "quick-snaps",
    label: "quick snaps",
    description: "fresh from my camera roll",
    sections: [
      {
        title: "Quick snaps",
        subtitle: "fresh from my camera roll",
        tiles: [
          { kind: "photo", size: "big", src: g("IMG_1493.jpeg"), caption: "lanterns", alt: "A wall of glowing paper lanterns in reds, yellows, pinks and greens." },
          { kind: "note", size: "tall", tone: "yellow", title: "Quick snaps", text: "the newest things on my camera roll, before they find an album." },
          { kind: "photo", size: "tall", src: g("IMG_1360.jpeg"), caption: "scrap sheet", alt: "A scrapbook page covered in stickers and drawings on a red gingham tablecloth, with craft supplies around it." },
          { kind: "photo", size: "tall", src: g("IMG_1494.jpeg"), caption: "found poster", alt: "A paper poster taped to a tree at night that asks “Are you ugly?” above a QR code." },
          { kind: "photo", size: "tall", src: g("IMG_1354.jpeg"), caption: "fall", alt: "A bright yellow tree beside a path in a park, under a cloudy autumn sky.", position: "50% 50%" },
        ],
      },
    ],
  },
  {
    id: "colombia",
    label: "colombia",
    description: "home",
    sections: [
      {
        title: "Colombia",
        subtitle: "home",
        tiles: [
          { kind: "photo", size: "big", src: g("IMG_0339.jpeg"), caption: "the waterfall", alt: "Isabella from behind on a trail in front of a tall waterfall in green mountains." },
          { kind: "photo", size: "tall", src: g("IMG_4376.jpeg"), caption: "monserrate", alt: "A worn card printed with “Monserrate, 3152 m más cerca de las estrellas” and a picture of the church on the mountain, on a wooden table." },
          { kind: "photo", size: "tall", src: g("IMG_4161.jpeg"), caption: "january 2026", alt: "Green hills under a cloudy sky, with a person and a white dog on the grassy slope." },
          { kind: "photo", size: "tall", src: g("IMG_3903.jpeg"), caption: "december 2022", alt: "A sunny beach with tall palm trees, white umbrellas and loungers on the sand." },
          { kind: "photo", size: "tall", src: g("6345E368-E385-49C7-9DB4-E8F166E5CFBB.jpeg"), caption: "june 2023", alt: "Two people seen from behind on a beach with palm trees and turquoise water.", position: "62% 50%" },
        ],
      },
    ],
  },
  {
    id: "travels",
    label: "travels",
    description: "paris, barcelona & elsewhere",
    sections: [
      {
        title: "Paris",
        subtitle: "april 2026",
        tiles: [
          { kind: "photo", size: "big", src: g("IMG_1910.jpeg"), caption: "a paris street", alt: "Isabella standing in the middle of a quiet Parisian street lined with cream stone buildings." },
          { kind: "note", size: "tall", tone: "blue", title: "Paris", text: "gardens, museums, long dinners and a lot of walking." },
          { kind: "photo", size: "tall", src: g("IMG_1577.jpeg"), caption: "jardin", alt: "A wide lawn between two rows of neatly trimmed trees, with people sitting on the grass under a blue sky." },
          { kind: "photo", size: "tall", src: g("IMG_5799.jpeg"), caption: "arc du carrousel", alt: "The Arc de Triomphe du Carrousel at sunset under a blue and pink sky." },
          { kind: "photo", size: "tall", src: g("IMG_5815.jpeg"), caption: "dinner", alt: "A dinner table with a plate of stew, small dishes and glasses." },
          { kind: "photo", size: "wide", src: g("pantheon.mp4"), video: true, caption: "panthéon", alt: "A short clip looking up at the columns and dome of the Panthéon against a blue sky." },
          { kind: "photo", size: "tall", src: g("IMG_5970.jpeg"), caption: "métro", alt: "A classic green Paris Métro entrance with its red “METRO” sign, under leafy trees." },
          { kind: "photo", size: "tall", src: g("IMG_2353.jpeg"), caption: "the dinosaur gallery", alt: "Isabella among dinosaur skeletons in a long museum gallery." },
        ],
      },
      {
        title: "Barcelona",
        subtitle: "spring 2025",
        tiles: [
          { kind: "note", size: "wide", tone: "pink", title: "Barcelona", text: "mountains, cathedrals and the trip the fanta collection comes from. (see the collections tab)" },
          { kind: "photo", size: "tall", src: g("IMG_1776.jpeg"), caption: "montserrat", alt: "The jagged peaks of Montserrat above a green valley." },
          { kind: "photo", size: "tall", src: g("IMG_1871.jpeg"), caption: "sagrada família", alt: "Looking up at the tree-like columns and starry ceiling inside the Sagrada Família." },
        ],
      },
      {
        title: "Elsewhere",
        tiles: [
          { kind: "photo", size: "wide", src: g("DSC04841.jpeg"), caption: "august 2026", alt: "A colourful wooden signpost pointing to cities around the world, with someone standing beside it." },
          { kind: "photo", size: "tall", src: g("DSC05283.jpeg"), caption: "september 2026", alt: "Isabella sitting on a stone wall above a river and an old town with church spires." },
          { kind: "note", size: "tall", tone: "blue", title: "next stop", text: "?" },
        ],
      },
    ],
  },
  {
    id: "canada",
    label: "canada",
    description: "mostly toronto",
    sections: [
      {
        title: "Canada",
        subtitle: "mostly toronto",
        tiles: [
          { kind: "photo", size: "big", src: g("IMG_7472-2.jpeg"), caption: "june 2026", alt: "Isabella standing on a rocky shore by the lake on a sunny day." },
          { kind: "note", size: "tall", tone: "pink", title: "Canada", text: "everyday things: walks, parks, the lake, the skyline." },
          { kind: "photo", size: "tall", src: g("IMG_0236.jpeg"), caption: "december 2024", alt: "Wooden stairs climbing through a snowy forest." },
          { kind: "photo", size: "tall", src: g("DSC04130.jpeg"), caption: "july 2026", alt: "An empty beach at dusk with calm water and a pale sky." },
          { kind: "photo", size: "tall", src: g("DSC03953.jpeg"), caption: "july 2026", alt: "A Canadian flag against a blue sky with white clouds.", position: "45% 50%" },
          { kind: "photo", size: "wide", src: g("DSC03981.jpeg"), caption: "riverdale park", alt: "Isabella standing in Riverdale Park at dusk, with people on the grass and the Toronto skyline behind." },
          { kind: "photo", size: "wide", src: g("DSC03733.jpeg"), caption: "jersey day", alt: "Isabella smiling on a beach in a Colombia jersey, with the lake behind her." },
          { kind: "photo", size: "wide", src: g("IMG_7472.jpeg"), caption: "toronto", alt: "The Toronto skyline and CN Tower at dusk, seen from the water." },
          { kind: "photo", size: "wide", src: g("DSC03961.jpeg"), caption: "by the water", alt: "Isabella leaning on a black railing by the water, with tall buildings across the river." },
        ],
      },
    ],
  },
  {
    id: "collections",
    label: "collections",
    description: "the fantas, to start",
    sections: [
      {
        title: "Fantas",
        subtitle: "collection no. 1 · spring 2025",
        tiles: [
          { kind: "photo", size: "big", src: g("IMG_1967.jpeg"), caption: "no. 08", alt: "A hand holding a blue Fanta can printed with an illustrated portrait, on a city street." },
          { kind: "note", size: "tall", tone: "yellow", title: "Fantas", text: "a little collection: a different Fanta wherever I go." },
          { kind: "photo", size: "tall", src: g("IMG_1161.jpeg"), caption: "no. 01", alt: "A hand holding a pink Fanta can in front of a yellow historic building." },
          { kind: "photo", size: "tall", src: g("IMG_1291.jpeg"), caption: "no. 02", alt: "A hand holding an orange Fanta can in a shop lined with bottles." },
          { kind: "photo", size: "tall", src: g("IMG_1521.jpeg"), caption: "no. 03", alt: "A hand holding a glass bottle of yellow Fanta on a sunny street." },
          { kind: "photo", size: "tall", src: g("IMG_1580.jpeg"), caption: "no. 04", alt: "A hand holding a lemon Fanta can in front of an old orange building." },
          { kind: "photo", size: "tall", src: g("IMG_1750.jpeg"), caption: "no. 05", alt: "A hand holding a green Fanta can in front of a stone, castle-like building." },
          { kind: "photo", size: "big", src: g("IMG_1983.jpeg"), caption: "no. 09", alt: "A hand holding a red bottle of Fanta by a bus stop under trees." },
          { kind: "photo", size: "tall", src: g("IMG_1752.jpeg"), caption: "no. 06", alt: "A hand holding a purple grape Fanta can over a lunch table with sandwiches." },
          { kind: "photo", size: "tall", src: g("IMG_1914.jpeg"), caption: "no. 07", alt: "A hand holding a pink Fanta can on a city street." },
        ],
      },
    ],
  },
];
