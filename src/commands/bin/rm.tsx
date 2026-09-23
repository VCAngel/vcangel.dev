import { canWriteDir } from "../../fs/permissions.ts";
import {
  deleteItem,
  listChildren,
  splitPath,
  stat,
} from "../../fs/virtualFS.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { parseArgs } from "../utils/args.ts";
import { resolve } from "../utils/fs.ts";
import { textResponse } from "../utils/output.tsx";

export const rmCommand: CommandExecutor = (args, fullCommand) => {
  const { flags, positional } = parseArgs(args);
  const recursive = flags.has("r") || flags.has("R") ||
    flags.has("recursive");
  const force = flags.has("f") || flags.has("force");

  if (!positional.length) {
    return textResponse(
      fullCommand,
      force ? [] : ["rm: missing operand"],
      "rm",
    );
  }

  const errors: string[] = [];
  for (const arg of positional) {
    const path = resolve(arg);
    const base = arg.replace(/\/+$/, "").split("/").pop();

    if (base === "." || base === "..") {
      errors.push(
        `rm: refusing to remove '.' or '..' directory: skipping '${arg}'`,
      );
      continue;
    }

    const item = stat(path);
    if (!item) {
      if (!force) {
        errors.push(`rm: cannot remove '${arg}': No such file or directory`);
      }
      continue;
    }
    if (item.type === "dir" && !recursive) {
      errors.push(`rm: cannot remove '${arg}': Is a directory`);
      continue;
    }

    const [parent, name] = splitPath(path);
    if (!canWriteDir(parent)) {
      errors.push(`rm: cannot remove '${arg}': Permission denied`);
      continue;
    }
    deleteItem(parent, name);
  }

  return textResponse(fullCommand, errors, "rm");
};

export const rmdirCommand: CommandExecutor = (args, fullCommand) => {
  if (!args.length) {
    return textResponse(fullCommand, ["rmdir: missing operand"], "rmdir");
  }

  const errors = args.flatMap((arg) => {
    const path = resolve(arg);
    const item = stat(path);
    const [parent, name] = splitPath(path);

    const reason = !item
      ? "No such file or directory"
      : item.type !== "dir"
      ? "Not a directory"
      : path === "/"
      ? "Device or resource busy"
      : listChildren(path).length
      ? "Directory not empty"
      : !canWriteDir(parent)
      ? "Permission denied"
      : null;

    if (reason) return [`rmdir: failed to remove '${arg}': ${reason}`];
    deleteItem(parent, name);
    return [];
  });

  return textResponse(fullCommand, errors, "rmdir");
};
