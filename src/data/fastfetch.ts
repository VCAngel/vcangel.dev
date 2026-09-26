// Profile panel content (islands/Preview.tsx), i.e. the `fastfetch` output

// TODO: Fetch 'fastfetch' data from a backend API instead of hardcoding it here

export interface FetchField {
  id: string;
  label: string;
  value: FetchField[] | string;
  href?: string;
  desktopOnly?: boolean;
}

const BIRTHDAY = new Date("2000-11-15T11:00:00Z");

export const FASTFETCH_AVATAR =
  "https://avatars.githubusercontent.com/u/42756104?v=4";

export const FASTFETCH_HANDLE = {
  text: "VCAngel@github",
  href: "https://github.com/VCAngel",
};

export const FASTFETCH_FIELDS: FetchField[] = [
  {
    id: "location",
    label: "Location:",
    value: "Chihuahua, Mexico",
    href:
      "https://www.google.com.mx/maps/place/Chihuahua,+Chih./@28.677362,-106.22181,11z/data=!3m1!4b1!4m6!3m5!1s0x86ea449d5d484033:0xb7f1a7a706dd1d7b!8m2!3d28.6433753!4d-106.0587908!16zL20vMDFmdnpo?entry=ttu",
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
    value: [
      {
        id: "langs",
        label: "Languages:",
        value: "[Typescript, Python, Java]",
      },
      {
        id: "front",
        label: "Frontend:",
        value: "[Next.js, React, Angular, HTML5, CSS3, TailwindCSS, SASS]",
      },
      {
        id: "back",
        label: "Backend:",
        value: "[Node.js, Deno, Express.js, Hono, AWS]",
      },
      {
        id: "tools",
        label: "Tools:",
        value: "[Linux, Nvim, Git, Docker, CI/CD]",
      },
    ],
  },
  { id: "learning", label: "Learning:", value: "[Rust, Lua]" },
  {
    id: "interests",
    label: "Interests:",
    value: "[Open Source, Rock/Metal, Gaming, Phrogs, Space]",
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
