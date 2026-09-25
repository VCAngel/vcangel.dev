// Portfolio content shared by both sites: the terminal (fastfetch, projects,
// contact, banner) and the SPA sections. Edit here, both update.
import { ContactChannel, Profile } from "../models/profile.model.ts";
import { Project } from "../models/project.model.ts";

export const profile: Profile = {
  name: "VCAngel",
  tagline: "The only limit is your imagination!",
  bio: "[PLACEHOLDER] A short bio for the Who Am I section",
  avatar: "https://avatars.githubusercontent.com/u/42756104?v=4",
  location: {
    text: "Chihuahua, Mexico",
    href:
      "https://www.google.com.mx/maps/place/Chihuahua,+Chih./@28.677362,-106.22181,11z/data=!3m1!4b1!4m6!3m5!1s0x86ea449d5d484033:0xb7f1a7a706dd1d7b!8m2!3d28.6433753!4d-106.0587908!16zL20vMDFmdnpo?entry=ttu",
  },
  skills: [
    "Javascript",
    "Typescript",
    "Python",
    "Java",
    "HTML5",
    "CSS3",
    "Angular",
    "React",
    "AWS",
    "Node.js",
    "Deno",
    "TailwindCSS",
  ],
  interests: ["GNU/Linux", "Rock/Metal", "Gaming", "Phrogs", "Space"],
};

export const projects: Project[] = [
  {
    name: "vcangel.dev",
    description:
      "Terminal-style portfolio website with modular commands and a virtual filesystem. This one right here!",
    stack: ["Deno", "Fresh", "Preact", "TypeScript", "Tailwind"],
    links: [
      {
        label: "github.com/VCAngel",
        url: "https://github.com/VCAngel/vcangel.dev",
      },
    ],
  },
  {
    name: "EZ-Sort",
    description:
      "SaaS platform that connects manufacturers and suppliers with certified quality partners for streamlining sorting and grading processes.",
    stack: ["Angular", "TypeScript", "Node.js", "AWS", "Tailwind"],
    links: [
      {
        label: "app.ezsort.tech",
        url: "https://app.ezsort.tech",
      },
    ],
  },
  {
    name: "dotfiles",
    description:
      "Configuration files for my terminal, editor, and other tools.",
    stack: ["Shell", "Neovim", "tmux", "suckless"],
    links: [
      {
        label: "github.com/VCAngel",
        url: "https://github.com/VCAngel/dotfiles",
      },
    ],
  },
];

export const contacts: ContactChannel[] = [
  {
    id: "github",
    label: "GitHub",
    text: "github.com/VCAngel",
    href: "https://github.com/VCAngel",
  },
  {
    id: "email",
    label: "Email",
    text: "vcangel00@gmail.com",
    href: "mailto:vcangel00@gmail.com",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    text: "linkedin.com/in/vcangel",
    href: "https://www.linkedin.com/in/vcangel",
  },
];
