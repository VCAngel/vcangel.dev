// Profile panel content (islands/Preview.tsx), i.e. the `fastfetch` output

export interface FetchField {
  id: string;
  label: string;
  value: string;
  href?: string;
  desktopOnly?: boolean;
}

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
  { id: "os", label: "OS:", value: "Arch Linux (btw)" },
  {
    id: "skills",
    label: "Skills:",
    value:
      "[Javascript, Typescript, Python, Java, HTML5, CSS3, Angular, React, AWS, Node.js, Deno, TailwindCSS]",
  },
  {
    id: "interests",
    label: "Interests:",
    value: "[GNU/Linux, Rock/Metal, Gaming, Phrogs, Space]",
  },
  {
    id: "status",
    label: "Status:",
    value: "𝕔𝕠𝕗𝕗𝕖𝕖 𝕥𝕚𝕞𝕖 𝕨𝕠𝕒𝕙! ☕",
    href:
      "https://drive.google.com/file/d/150I8lteRmwdnYZAd-a6OPKhtFF2thAms/view?usp=sharing",
    desktopOnly: true,
  },
];
