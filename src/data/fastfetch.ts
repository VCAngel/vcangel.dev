// Profile panel content (islands/Preview.tsx), i.e. the `fastfetch` output
import { profile } from "./profile.ts";
import { CLIProfileData } from "@/src/models/profile.model.ts";

export type FetchField = CLIProfileData;
/* {
  id: string;
  label: string;
  value: FetchField[] | string;
  href?: string;
  desktopOnly?: boolean;
} */

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
    id: "name",
    label: profile.name.label,
    value: profile.name.value,
  },
  {
    id: "location",
    label: profile.location.label,
    value: profile.location.value,
    href: profile.location.href,
  },
  {
    id: "uptime",
    label: profile.uptime.label,
    value: profile.uptime.value,
  },
  { id: "os", label: profile.os.label, value: profile.os.value },
  {
    id: "skills",
    label: "Skills:",
    value: [
      {
        id: "langs",
        label: profile.languagesCLI.label,
        value: profile.languagesCLI.value,
      },
      {
        id: "front",
        label: profile.frontendCLI.label,
        value: profile.frontendCLI.value,
      },
      {
        id: "back",
        label: profile.backendCLI.label,
        value: profile.backendCLI.value,
      },
      {
        id: "tools",
        label: profile.toolsCLI.label,
        value: profile.toolsCLI.value,
      },
    ],
  },
  {
    id: "learning",
    label: profile.learningCLI.label,
    value: profile.learningCLI.value,
  },
  {
    id: "interests",
    label: profile.interestsCLI.label,
    value: profile.interestsCLI.value,
  },
  {
    id: "locales",
    label: profile.localesCLI.label,
    value: profile.localesCLI.value,
  },
  {
    id: "status",
    label: profile.status.label,
    value: profile.status.value,
    href: profile.status.href,
    desktopOnly: true,
  },
];
