// Profile panel content (islands/Preview.tsx), i.e. the `fastfetch` output
import { profile } from "./profile.ts";

// TODO: Fetch 'fastfetch' data from a backend API instead of hardcoding it here

export interface FetchField {
  id: string;
  label: string;
  value: FetchField[] | string;
  href?: string;
  desktopOnly?: boolean;
}

const BIRTHDAY = new Date("2000-11-15T11:00:00Z");

export const FASTFETCH_AVATAR_LIST = [
  "img/pfp_1.JPG",
  "img/pfp_3.JPG",
  "img/pfp_2.jpg",
  "img/phrog.gif",
];

export const FASTFETCH_HANDLE = {
  text: "VCAngel@github",
  href: "https://github.com/VCAngel",
};

export const FASTFETCH_FIELDS: FetchField[] = [
  {
    id: "location",
    label: "Location:",
    value: profile.location.text,
    href: profile.location.href,
  },
  {
    id: "uptime",
    label: "Uptime:",
    value: (() => {
      // return the time in years, days, hours since my birthday (2000-11-15)
      const now = new Date();
      const diff = now.getTime() - BIRTHDAY.getTime();
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      return `${years} years`;
    })(),
  },
  { id: "os", label: "OS:", value: "Arch Linux (btw)" },
  {
    id: "skills",
    label: "Skills:",
    value: `[${profile.skills.join(", ")}]`,
  },
  { id: "learning", label: "Learning:", value: "[Rust, Lua]" },
  {
    id: "interests",
    label: "Interests:",
    value: `[${profile.interests.join(", ")}]`,
  },
  { id: "locales", label: "Locales:", value: "[en_US, es_MX, none_Sense]" },
  {
    id: "status",
    label: "Status:",
    value: "I do my best ( ˙꒳​˙ )",
    href: "https://youtube.com/shorts/zgRRBK1LG5A?si=7d3rqLndY9-dL9h6",
    desktopOnly: true,
  },
];
