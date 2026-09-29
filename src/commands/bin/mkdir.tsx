import { canWriteDir } from "../../fs/permissions.ts";
import { createDirectory, isDir, splitPath, stat } from "../../fs/virtualFS.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { parseArgs } from "../utils/args.ts";
import { resolve } from "../utils/fs.ts";
import { textResponse } from "../utils/output.tsx";

// Returns an error reason, or null once `path` exists as a directory
function makeDirectory(path: string, parents: boolean): string | null {
  const item = stat(path);
  if (item) return parents && item.type === "dir" ? null : "File exists";

  const [parent, name] = splitPath(path);
  if (!isDir(parent)) {
    if (stat(parent)) return "Not a directory";
    if (!parents) return "No such file or directory";
    const error = makeDirectory(parent, true);
    if (error) return error;
  }

  if (!canWriteDir(parent)) return "Permission denied";
  createDirectory(parent, name);
  return null;
}

export const mkdirCommand: CommandExecutor = (args, fullCommand) => {
  const { flags, positional } = parseArgs(args);

  if (!positional.length) {
    return textResponse(fullCommand, ["mkdir: missing operand"], "mkdir");
  }

  const errors = positional.flatMap((arg) => {
    const error = makeDirectory(resolve(arg), flags.has("p"));
    return error ? [`mkdir: cannot create directory '${arg}': ${error}`] : [];
  });

  return textResponse(fullCommand, errors, "mkdir");
};
