// Profile panel content (islands/Preview.tsx), i.e. the `fastfetch` output
import { profile } from "./profile.ts";

export interface FetchField {
  id: string;
  label: string;
  value: string;
  href?: string;
  desktopOnly?: boolean;
}

export const FASTFETCH_AVATAR = profile.avatar;

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
  { id: "os", label: "OS:", value: "Arch Linux (btw)" },
  {
    id: "skills",
    label: "Skills:",
    value: `[${profile.skills.join(", ")}]`,
  },
  {
    id: "interests",
    label: "Interests:",
    value: `[${profile.interests.join(", ")}]`,
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
