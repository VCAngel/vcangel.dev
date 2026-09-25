import { USERS } from "../data/users.ts";
import { DirectoryItem } from "../models/fs.model.ts";
import { User } from "../models/user.model.ts";
import { effectiveUser } from "../state/session.state.ts";
import { splitPath, stat } from "./virtualFS.ts";

export const READ = 4;
export const WRITE = 2;
export const EXEC = 1;

const defaultMode = (item: DirectoryItem) =>
  item.type === "file" ? 0o644 : 0o755;

export function hasPerm(
  item: DirectoryItem,
  bit: number,
  user: User = effectiveUser(),
): boolean {
  if (user === "root") return true;

  const mode = item.mode ?? defaultMode(item);
  const owner = item.owner ?? "guest";
  const group = item.group ?? owner;

  const shift = user === owner ? 6 : USERS[user].groups.includes(group) ? 3 : 0;

  return ((mode >> shift) & bit) !== 0;
}

// Every ancestor directory of `path` must be searchable (x)
export function canTraverse(path: string): boolean {
  let current = splitPath(path)[0];
  const ancestors = [current];
  while (current !== "/") {
    current = splitPath(current)[0];
    ancestors.push(current);
  }
  return ancestors.every((dirPath) => {
    const item = stat(dirPath);
    return !!item && hasPerm(item, EXEC);
  });
}

// Reading/listing `path` itself
export function canRead(path: string): boolean {
  const item = stat(path);
  return !!item && canTraverse(path) && hasPerm(item, READ);
}

// Creating, removing or renaming entries inside directory `dirPath`
export function canWriteDir(dirPath: string): boolean {
  const item = stat(dirPath);
  return !!item && canTraverse(dirPath) && hasPerm(item, WRITE) &&
    hasPerm(item, EXEC);
}

export function modeString(item: DirectoryItem): string {
  const mode = item.mode ?? defaultMode(item);
  const bits = ["r", "w", "x"];
  let out = item.type === "dir" ? "d" : "-";
  for (let i = 8; i >= 0; i--) {
    out += (mode >> i) & 1 ? bits[(8 - i) % 3] : "-";
  }
  return out;
}
