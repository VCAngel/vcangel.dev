import { signal } from "@preact/signals";

import { Filesystem, DirectoryItem } from "../models/fs.model.ts";

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

const initialFS: Filesystem = {
  "/": [{ name: "home", type: "dir" }],
  "/home": [...parentRoutes, { name: "guest", type: "dir" }],
  "/home/guest": [
    ...parentRoutes,
    { name: "Documents", type: "dir" },
    { name: "Images", type: "dir" },
    { name: "README.md", type: "file" },
  ],
  "/home/guest/Documents": [
    ...parentRoutes,
    { name: "resume.pdf", type: "file" },
  ],
  "/home/guest/Images": [
    ...parentRoutes,
    { name: "me.png", type: "file" },
    { name: "phrog.gif", type: "file" },
    { name: "le_meme.png", type: "file" },
  ],
};

// File content storage
export const fileContents: Record<string, string> = {
  "/home/guest/README.md":
    "# Welcome to VCAngel's Terminal\n\nFeel free to explore using the terminal commands!\n\nType `help` to see available commands.",
};

export const fs = signal<Filesystem>(initialFS);

// Filesystem operations
export function getContents(path: string): DirectoryItem[] | null {
  return fs.value[path] || null;
}

export function createFile(
  path: string,
  name: string,
  content: string = "",
): boolean {
  const dirPath = path.endsWith("/") ? path.slice(0, -1) : path;

  if (!fs.value[dirPath]) return false;

  // Update directory listing
  fs.value = {
    ...fs.value,
    [dirPath]: [
      ...fs.value[dirPath].filter((item) => item.name !== name),
      { name, type: "file" },
    ],
  };

  // Store file content
  const filePath = `${dirPath}/${name}`;
  fileContents[filePath] = content;

  return true;
}

export function createDirectory(path: string, name: string): boolean {
  const dirPath = path.endsWith("/") ? path.slice(0, -1) : path;

  if (!fs.value[dirPath]) return false;

  const newDirPath = `${dirPath}/${name}`;

  // Update parent directory listing
  fs.value = {
    ...fs.value,
    [dirPath]: [
      ...fs.value[dirPath].filter((item) => item.name !== name),
      { name, type: "dir" },
    ],
    // Create the new directory with standard entries
    [newDirPath]: [
      { name: "..", type: "dir", ignoredByList: true },
      { name: "/", type: "dir", ignoredByList: true },
    ],
  };

  return true;
}

export function readFile(path: string): string | null {
  return fileContents[path] || null;
}

export function deleteItem(path: string, name: string): boolean {
  const dirPath = path.endsWith("/") ? path.slice(0, -1) : path;

  if (!fs.value[dirPath]) return false;

  const item = fs.value[dirPath].find((i) => i.name === name);
  if (!item) return false;

  // Remove from directory listing
  fs.value = {
    ...fs.value,
    [dirPath]: fs.value[dirPath].filter((i) => i.name !== name),
  };

  // If it's a directory, need to recursively delete
  if (item.type === "dir") {
    const fullPath = `${dirPath}/${name}`;
    if (fs.value[fullPath]) {
      // Recursively delete contents
      // In a real implementation, this would be more complex
      delete fs.value[fullPath];
    }
  } else if (item.type === "file") {
    // Delete file content
    delete fileContents[`${dirPath}/${name}`];
  }

  return true;
}

// Path utilities
export function resolvePath(relativePath: string, currentPath: string): string {
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
