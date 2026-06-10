import { Project } from "../models/project.model.ts";

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
