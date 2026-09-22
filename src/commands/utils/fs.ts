import { canRead, canTraverse } from "../../fs/permissions.ts";
import {
  joinPath,
  listChildren,
  readFile,
  resolvePath,
  stat,
} from "../../fs/virtualFS.ts";
import { DirectoryItem } from "../../models/fs.model.ts";
import { currentDirectory } from "../../state/app.state.ts";

export const resolve = (arg: string) =>
  resolvePath(arg, currentDirectory.value);

export type ReadResult =
  | { path: string; text: string }
  | { error: string; binary?: true };

// Reads a text file for `cmd`, returning a GNU-style error on failure
export function readText(cmd: string, arg: string): ReadResult {
  const path = resolve(arg);
  const item = stat(path);

  if (!item) return { error: `${cmd}: ${arg}: No such file or directory` };
  if (!canTraverse(path)) {
    return { error: `${cmd}: ${arg}: Permission denied` };
  }
  if (item.type === "dir") return { error: `${cmd}: ${arg}: Is a directory` };
  if (!canRead(path)) return { error: `${cmd}: ${arg}: Permission denied` };

  const text = readFile(path);
  if (text === null) {
    return { error: `${cmd}: ${arg}: binary file, not printing`, binary: true };
  }
  return { path, text };
}

export interface WalkEntry {
  path: string; // Display path (relative to how the root was given)
  absolute: string;
  item: DirectoryItem;
  depth: number;
  denied?: boolean; // Directory couldn't be opened
}

// Depth-first walk of `rootArg`, including the root itself
export function walk(rootArg: string, includeHidden = true): WalkEntry[] {
  const rootPath = resolve(rootArg);
  const rootItem = stat(rootPath);
  if (!rootItem) return [];

  const entries: WalkEntry[] = [];
  const visit = (
    absolute: string,
    display: string,
    item: DirectoryItem,
    depth: number,
  ) => {
    const denied = item.type === "dir" && !canRead(absolute);
    entries.push({ path: display, absolute, item, depth, denied });
    if (item.type !== "dir" || denied) return;

    const children = listChildren(absolute)
      .filter((child) => includeHidden || !child.name.startsWith("."))
      .sort((a, b) => a.name.localeCompare(b.name));
    for (const child of children) {
      visit(
        joinPath(absolute, child.name),
        display.endsWith("/")
          ? display + child.name
          : `${display}/${child.name}`,
        child,
        depth + 1,
      );
    }
  };

  visit(rootPath, rootArg, rootItem, 0);
  return entries;
}
