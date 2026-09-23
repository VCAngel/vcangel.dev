import { canRead } from "../../fs/permissions.ts";
import { joinPath, listChildren, stat } from "../../fs/virtualFS.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { parseArgs } from "../utils/args.ts";
import { resolve } from "../utils/fs.ts";
import { FAST, textResponse } from "../utils/output.tsx";

const DENIED = " [error opening dir]";

export const treeCommand: CommandExecutor = (args, fullCommand) => {
  const { flags, positional } = parseArgs(args);
  const all = flags.has("a");
  const target = positional[0] ?? ".";
  const rootPath = resolve(target);
  const root = stat(rootPath);

  const counts = { dirs: 0, files: 0 };
  const lines: string[] = [];

  const build = (path: string, prefix: string) => {
    const children = listChildren(path)
      .filter((child) => all || !child.name.startsWith("."))
      .sort((a, b) => a.name.localeCompare(b.name));

    children.forEach((child, index) => {
      const last = index === children.length - 1;
      const childPath = joinPath(path, child.name);
      const isDir = child.type === "dir";
      const denied = isDir && !canRead(childPath);

      lines.push(
        `${prefix}${last ? "└── " : "├── "}${child.name}${
          denied ? DENIED : ""
        }`,
      );

      if (!isDir) {
        counts.files++;
        return;
      }
      counts.dirs++;
      if (!denied) build(childPath, `${prefix}${last ? "    " : "│   "}`);
    });
  };

  if (!root || root.type !== "dir" || !canRead(rootPath)) {
    lines.push(`${target}${DENIED}`);
  } else {
    lines.push(target);
    build(rootPath, "");
  }

  lines.push(
    "",
    `${counts.dirs} ${
      counts.dirs === 1 ? "directory" : "directories"
    }, ${counts.files} ${counts.files === 1 ? "file" : "files"}`,
  );

  return textResponse(fullCommand, lines, "tree", FAST);
};
