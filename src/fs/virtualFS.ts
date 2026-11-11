import { signal } from "@preact/signals";

import { projects } from "../data/profile.ts";
import { USERS } from "../data/users.ts";
import { DirectoryItem, Filesystem, MediaFile } from "../models/fs.model.ts";
import { User } from "../models/user.model.ts";
import { projectImageFile } from "../utils/images.ts";
import { currentUser, effectiveUser } from "../state/session.state.ts";

// NOTE: Initial FS structure
const parentRoutes: DirectoryItem[] = [
  {
    name: "/",
    type: "dir",
    ignoredByList: true,
  },
  {
    name: "..",
    type: "dir",
    ignoredByList: true,
  },
];

const SEED_TIME = Date.UTC(2026, 0, 1, 12, 0);

const dir = (name: string, owner: User = "root", mode = 0o755) => ({
  name,
  type: "dir" as const,
  owner,
  group: owner,
  mode,
  mtime: SEED_TIME,
});

const file = (
  name: string,
  owner: User = "guest",
  mode = 0o644,
  size?: number,
) => ({
  name,
  type: "file" as const,
  owner,
  group: owner,
  mode,
  mtime: SEED_TIME,
  size,
});

// Binary file backed by a real image, viewable with `open`
const image = ({ name, src, alt }: MediaFile, size?: number) => ({
  ...file(name, "guest", 0o644, size),
  media: { src, alt },
});

// One markdown file per project, grouped by kind (work/ personal/ lab/).
// Generated from profile.ts so the terminal, the SPA and `cat` never drift.
const KIND_DIRS = { work: "work", personal: "projects", lab: "lab" } as const;

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const projectMarkdown = (project: (typeof projects)[number]) =>
  [
    `# ${project.name}`,
    `${project.kind}${project.role ? ` · ${project.role}` : ""}`,
    "",
    `Stack: ${project.stack.join(", ")}`,
    ...(project.links.length
      ? ["", ...project.links.map((l) => `${l.label} -> ${l.url}`)]
      : []),
    ...(project.images?.length
      ? [
        "",
        `Screenshots (open <file>): ${
          project.images
            .map((shot) =>
              `${slugify(project.name)}/${projectImageFile(shot).name}`
            )
            .join(", ")
        }`,
      ]
      : []),
  ].join("\n");

// Screenshots live as binary files in a `<slug>/` dir next to the .md
const projectFiles = (kind: keyof typeof KIND_DIRS) =>
  projects
    .filter((project) => project.kind === kind)
    .map((project) => ({
      path: `/home/guest/${KIND_DIRS[kind]}/${slugify(project.name)}.md`,
      name: `${slugify(project.name)}.md`,
      imageDir: project.images?.length
        ? `/home/guest/${KIND_DIRS[kind]}/${slugify(project.name)}`
        : null,
      project,
    }));

const allProjectFiles = (
  Object.keys(KIND_DIRS) as (keyof typeof KIND_DIRS)[]
).flatMap(projectFiles);

// Stands in for "/" itself, which has no parent listing
const ROOT_ITEM: DirectoryItem = dir("/");

const initialFS: Filesystem = {
  "/": [dir("etc"), dir("home"), dir("root", "root", 0o700)],
  "/etc": [...parentRoutes, file("passwd", "root")],
  "/root": [...parentRoutes, file(".flag", "root", 0o600)],
  "/home": [
    ...parentRoutes,
    dir("guest", "guest"),
    dir("vcangel", "vcangel", 0o700),
  ],
  "/home/guest": [
    ...parentRoutes,
    dir(".secrets", "guest"),
    dir("Documents", "guest"),
    dir("Images", "guest"),
    ...Object.values(KIND_DIRS).map((name) => dir(name, "guest")),
    file("README.md"),
  ],
  ...Object.fromEntries(
    (Object.keys(KIND_DIRS) as (keyof typeof KIND_DIRS)[]).map((kind) => [
      `/home/guest/${KIND_DIRS[kind]}`,
      [
        ...parentRoutes,
        ...projectFiles(kind).flatMap(({ name, imageDir, project }) => [
          file(name, "guest"),
          ...(imageDir ? [dir(slugify(project.name), "guest")] : []),
        ]),
      ],
    ]),
  ),
  ...Object.fromEntries(
    allProjectFiles.flatMap(({ imageDir, project }) =>
      imageDir
        ? [
          [
            imageDir,
            [
              ...parentRoutes,
              ...(project.images ?? []).map((shot) =>
                image(projectImageFile(shot))
              ),
            ],
          ],
        ]
        : []
    ),
  ),
  "/home/guest/.secrets": [...parentRoutes, file(".hint")],
  "/home/guest/Documents": [
    ...parentRoutes,
    file("resume.pdf", "guest", 0o644, 84213),
  ],
  "/home/guest/Images": [
    ...parentRoutes,
    image(
      { name: "pfp.png", src: "/img/pfp_1.webp", alt: "That's me!" },
      51277,
    ),
    image(
      { name: "phrog.gif", src: "/img/phrog.webp", alt: "A phrog" },
      230144,
    ),
  ],
  "/home/vcangel": [...parentRoutes, file("notes.txt", "vcangel", 0o600)],
};

// File content storage, keyed by absolute path. Files without an entry
// (pdf, images) are treated as binaries.
const initialContents: Record<string, string> = {
  ...Object.fromEntries(
    allProjectFiles.map(({ path, project }) => [
      path,
      projectMarkdown(project),
    ]),
  ),
  "/home/guest/README.md":
    "# Welcome to VCAngel's Terminal\n\nFeel free to explore using the terminal commands!\n\nType `help` to see available commands.\n\nNote: changes you make to the filesystem are saved in your browser's\nlocalStorage, so they survive a reload. Nothing leaves your browser.",
  "/home/guest/.secrets/.hint":
    "[PLACEHOLDER] A riddle that leads to the passphrase for `su vcangel`",
  "/home/vcangel/notes.txt": "[PLACEHOLDER] vcangel's private notes",
  "/root/.flag": "[PLACEHOLDER] You found root's flag!",
  "/etc/passwd":
    "root:x:0:0:root:/root:/bin/zsh\nvcangel:x:1000:1000:VCAngel:/home/vcangel:/bin/zsh\nguest:x:1001:1001:Guest:/home/guest:/bin/zsh",
};

export const fs = signal<Filesystem>(structuredClone(initialFS));
export const fileContents = signal<Record<string, string>>({
  ...initialContents,
});

export function resetFS() {
  fs.value = structuredClone(initialFS);
  fileContents.value = { ...initialContents };
}

// Path helpers
export function joinPath(dirPath: string, name: string): string {
  return dirPath === "/" ? `/${name}` : `${dirPath}/${name}`;
}

export function splitPath(path: string): [string, string] {
  const parts = path.split("/").filter(Boolean);
  const name = parts.pop() ?? "";
  return ["/" + parts.join("/"), name];
}

const isWithin = (path: string, base: string) =>
  path === base || path.startsWith(base === "/" ? "/" : `${base}/`);

// Filesystem operations
export function getContents(path: string): DirectoryItem[] | null {
  return fs.value[path] || null;
}

// Visible children of a directory (without the `/` and `..` markers)
export function listChildren(path: string): DirectoryItem[] {
  return (fs.value[path] ?? []).filter((item) => !item.ignoredByList);
}

export function stat(path: string): DirectoryItem | null {
  if (path === "/") return ROOT_ITEM;
  const [parent, name] = splitPath(path);
  return listChildren(parent).find((item) => item.name === name) ?? null;
}

export function isDir(path: string): boolean {
  return !!fs.value[path];
}

// Adds or replaces `item` in its parent listing
function upsertItem(dirPath: string, item: DirectoryItem): Filesystem {
  return {
    ...fs.value,
    [dirPath]: [...fs.value[dirPath].filter((i) => i.name !== item.name), item],
  };
}

function newItem(name: string, type: "dir" | "file"): DirectoryItem {
  const owner = effectiveUser();
  return {
    name,
    type,
    owner,
    group: owner,
    mode: type === "dir" ? 0o755 : 0o644,
    mtime: Date.now(),
  };
}

export function createFile(
  path: string,
  name: string,
  content: string = "",
): boolean {
  const dirPath = path.length > 1 && path.endsWith("/")
    ? path.slice(0, -1)
    : path;

  if (!fs.value[dirPath]) return false;

  // Text content replaces whatever binary (fake size, image) was there
  const existing = fs.value[dirPath].find((item) => item.name === name);
  const item = existing
    ? { ...existing, mtime: Date.now(), size: undefined, media: undefined }
    : newItem(name, "file");

  fs.value = upsertItem(dirPath, item);
  fileContents.value = {
    ...fileContents.value,
    [joinPath(dirPath, name)]: content,
  };

  return true;
}

export function createDirectory(path: string, name: string): boolean {
  const dirPath = path.length > 1 && path.endsWith("/")
    ? path.slice(0, -1)
    : path;

  if (!fs.value[dirPath]) return false;

  fs.value = {
    ...upsertItem(dirPath, newItem(name, "dir")),
    [joinPath(dirPath, name)]: [...parentRoutes],
  };

  return true;
}

export function touchItem(path: string) {
  const item = stat(path);
  if (!item || path === "/") return;
  fs.value = upsertItem(splitPath(path)[0], { ...item, mtime: Date.now() });
}

export function readFile(path: string): string | null {
  return fileContents.value[path] ?? null;
}

export function deleteItem(path: string, name: string): boolean {
  const dirPath = path.length > 1 && path.endsWith("/")
    ? path.slice(0, -1)
    : path;

  if (!fs.value[dirPath]) return false;

  const item = fs.value[dirPath].find((i) => i.name === name);
  if (!item) return false;

  const fullPath = joinPath(dirPath, name);
  const nextFS: Filesystem = {};
  for (const [key, items] of Object.entries(fs.value)) {
    if (!isWithin(key, fullPath)) nextFS[key] = items;
  }
  nextFS[dirPath] = fs.value[dirPath].filter((i) => i.name !== name);

  const nextContents: Record<string, string> = {};
  for (const [key, content] of Object.entries(fileContents.value)) {
    if (!isWithin(key, fullPath)) nextContents[key] = content;
  }

  fs.value = nextFS;
  fileContents.value = nextContents;
  return true;
}

// Wipes everything, `rm -rf /` style
export function deleteAll() {
  fs.value = { "/": [] };
  fileContents.value = {};
}

// Copies (or moves) `src` and everything under it to the absolute path `dst`
function transferPath(src: string, dst: string, keepSource: boolean) {
  const item = stat(src);
  if (!item || src === "/") return false;

  const [srcParent] = splitPath(src);
  const [dstParent, dstName] = splitPath(dst);
  if (!fs.value[dstParent]) return false;

  const rekey = (key: string) => dst + key.slice(src.length);
  const copied = keepSource
    ? {
      ...newItem(dstName, item.type === "dir" ? "dir" : "file"),
      size: item.size,
      media: item.media,
    }
    : { ...item, name: dstName };

  const nextFS: Filesystem = {};
  for (const [key, items] of Object.entries(fs.value)) {
    const inside = isWithin(key, src);
    if (!inside || keepSource) nextFS[key] = items;
    if (inside) nextFS[rekey(key)] = items;
  }
  if (!keepSource) {
    nextFS[srcParent] = nextFS[srcParent].filter((i) => i.name !== item.name);
  }
  nextFS[dstParent] = [
    ...nextFS[dstParent].filter((i) => i.name !== dstName),
    copied,
  ];

  const nextContents: Record<string, string> = {};
  for (const [key, content] of Object.entries(fileContents.value)) {
    // WARN: Skip the destination subtree before copying source entries so the source content wins
    if (isWithin(key, src)) continue;
    const inside = isWithin(key, src);
    if (!inside || keepSource) nextContents[key] = content;
    if (inside) nextContents[rekey(key)] = content;
  }

  fs.value = nextFS;
  fileContents.value = nextContents;
  return true;
}

export function movePath(src: string, dst: string): boolean {
  return transferPath(src, dst, false);
}

export function copyPath(src: string, dst: string): boolean {
  return transferPath(src, dst, true);
}

// Path utilities
export function resolvePath(relativePath: string, currentPath: string): string {
  if (relativePath === "~" || relativePath.startsWith("~/")) {
    return normalizePath(USERS[currentUser.value].home + relativePath.slice(1));
  }

  if (relativePath.startsWith("/")) {
    return normalizePath(relativePath);
  }

  if (relativePath === ".") {
    return currentPath;
  }

  if (relativePath === "..") {
    const parts = currentPath.split("/").filter(Boolean);
    if (parts.length === 0) return "/";
    return "/" + parts.slice(0, -1).join("/");
  }

  return normalizePath(`${currentPath}/${relativePath}`);
}

function normalizePath(path: string): string {
  const parts = path.split("/").filter(Boolean);
  const result: string[] = [];

  for (const part of parts) {
    if (part === "..") {
      result.pop();
    } else if (part !== ".") {
      result.push(part);
    }
  }

  return "/" + result.join("/");
}
