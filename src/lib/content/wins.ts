// Ported verbatim from winsData in the design source.

export type WinItem = {
  abbr: string;
  name: string;
  story: string;
};

export type WinCategory = {
  title: string;
  items: WinItem[];
};

export const winsCategories: WinCategory[] = [
  {
    title: "Brands",
    items: [
      {
        abbr: "CH",
        name: "Ching's",
        story: "National FMCG brand — campaign strategy & activation.",
      },
      {
        abbr: "CP",
        name: "The Container's Park",
        story: "Hospitality & F&B — brand experience and marketing.",
      },
      {
        abbr: "TOI",
        name: "The Times of India",
        story: "India's largest English daily — collaborative initiatives.",
      },
    ],
  },
  {
    title: "Educational Institutions",
    items: [
      {
        abbr: "MV",
        name: "Maharshi Vidyalaya",
        story: "Institutional branding & communication strategy.",
      },
      {
        abbr: "NV",
        name: "Navrachana Vidyalaya",
        story: "Marketing and outreach programs.",
      },
      {
        abbr: "AV",
        name: "Amrit Vidyalaya",
        story: "Brand positioning and community engagement.",
      },
    ],
  },
  {
    title: "Ventures & Communities",
    items: [
      {
        abbr: "SA",
        name: "Samarthyam",
        story: "Social empowerment venture — built and grown.",
      },
      {
        abbr: "TT",
        name: "The Thespian's Tribe",
        story: "Performing arts platform — culture in motion.",
      },
      {
        abbr: "AT",
        name: "Aniradichita Theatre & Films",
        story: "Theatre and cinema production.",
      },
    ],
  },
];

export const impactStats = [
  { value: 3, label: "National Brands" },
  { value: 3, label: "Institutions" },
  { value: 3, label: "Ventures Built" },
  { value: 1, label: "Shared Mission" },
];
