// Portfolio content shared by both sites: the terminal (fastfetch, projects,
// contact, banner) and the SPA sections. Edit here, both update.
import { ContactChannel, Profile } from "../models/profile.model.ts";
import { Project } from "../models/project.model.ts";

// TODO: Fetch 'fastfetch' data from a backend API instead of hardcoding it here

const BIRTHDAY = new Date("2000-11-15T11:00:00Z");

export const profile: Profile = {
  // NOTE: General
  name: {
    label: "Name:",
    value: "Ángel Vargas",
  },
  tagline: {
    label: "Tagline:",
    value: "The only limit is your imagination!",
  },
  bio: {
    label: "Bio:",
    value:
      `Full-Stack SWE with 3+ years of experience delivering production software that solves real operational problems. Learning is my passion, so I always strive to improve my skills and stay up-to-date with the latest technologies.

Open Source enthusiast, gamer, and music lover. Feel free to reach out for collaboration or just to say hi!`,
  },
  avatar: { label: "Avatar:", value: "img/pfp_1.JPG" },
  location: {
    label: "Location:",
    value: "Chihuahua, Mexico",
    href:
      "https://www.google.com.mx/maps/place/Chihuahua,+Chih./@28.677362,-106.22181,11z/data=!3m1!4b1!4m6!3m5!1s0x86ea449d5d484033:0xb7f1a7a706dd1d7b!8m2!3d28.6433753!4d-106.0587908!16zL20vMDFmdnpo?entry=ttu",
  },
  uptime: {
    label: "Uptime:",
    value: (() => {
      // return the time in years, days, hours since my birthday (2000-11-15)
      const now = new Date();
      const diff = now.getTime() - BIRTHDAY.getTime();
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      return `${years} years`;
    })(),
  },
  os: { label: "OS:", value: "Arch Linux (btw)" },
  status: {
    label: "Status:",
    value: "I do my best ( ˙꒳​˙ )",
    href: "https://youtube.com/shorts/zgRRBK1LG5A?si=7d3rqLndY9-dL9h6",
    desktopOnly: true,
  },

  // NOTE: SPA fields
  skillsSPA: {
    label: "Skills:",
    value: [
      "JavaScript",
      "TypeScript",
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
  },
  interestsSPA: {
    label: "Interests:",
    value: ["GNU/Linux", "Rock/Metal", "Gaming", "Phrogs", "Space"],
  },
  learningSPA: {
    label: "Learning:",
    value: ["Rust", "Lua"],
  },
  localesSPA: { label: "Locales:", value: ["en_US", "es_MX", "none_Sense"] },

  // NOTE: CLI fields
  languagesCLI: { label: "Languages:", value: "[Typescript, Python, Java]" },
  frontendCLI: {
    label: "Frontend:",
    value: "[Next.js, React, Angular, HTML5, CSS3, TailwindCSS, SASS]",
  },
  backendCLI: {
    label: "Backend:",
    value:
      "[Node.js, Deno, Express.js, Hono, AWS (Lambda, API Gateway, RDS, DynamoDB CloudFormation)]",
  },
  toolsCLI: { label: "Tools:", value: "[Linux, Nvim, Git, Docker, CI/CD]" },
  learningCLI: { label: "Learning:", value: "[Rust, Lua]" },
  interestsCLI: {
    label: "Interests:",
    value: "[Open Source, Rock/Metal, Gaming, Phrogs, Space]",
  },
  localesCLI: { label: "Locales:", value: "[en_US, es_MX, none_Sense]" },
};

export const projects: Project[] = [
  {
    name: "EZ-Sort",
    kind: "work",
    role: "Full-Stack SWE",
    description:
      "SaaS platform that connects manufacturers and suppliers with certified quality partners for streamlining sorting and grading processes.",
    stack: ["Angular", "TypeScript", "Node.js", "AWS", "TailwindCSS"],
    links: [
      {
        label: "app.ezsort.tech",
        url: "https://app.ezsort.tech",
      },
    ],
  },
  {
    name: "Portfolio Website",
    kind: "personal",
    description:
      "Terminal-style portfolio website with modular commands and a virtual filesystem. This one right here!",
    stack: ["Deno", "Fresh", "Preact", "TypeScript", "TailwindCSS"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/VCAngel/vcangel.dev",
      },
    ],
  },
  {
    name: "OpenClaw",
    kind: "lab",
    description:
      "Self-hosted AI gateway: an AWS Lightsail instance fronting several agents, with local models served from my desktop over Tailscale.",
    stack: ["AWS Lightsail", "Ollama", "Tailscale", "Linux"],
    links: [
      {
        label: "claw.vcangel.dev",
        url: "https://claw.vcangel.dev",
      },
    ],
  },
  {
    name: "dotfiles",
    kind: "lab",
    description:
      "Configuration files for my terminal, editor, and other tools.",
    stack: ["Shell", "Neovim", "tmux", "suckless"],
    links: [
      {
        label: "GitHub",
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
