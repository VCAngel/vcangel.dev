import {
  canTraverse,
  canWriteDir,
  hasPerm,
  WRITE,
} from "../../fs/permissions.ts";
import {
  createFile,
  isDir,
  splitPath,
  stat,
  touchItem,
} from "../../fs/virtualFS.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { resolve } from "../utils/fs.ts";
import { textResponse } from "../utils/output.tsx";

function touch(path: string): string | null {
  const item = stat(path);

  if (item) {
    if (!canTraverse(path) || !hasPerm(item, WRITE)) {
      return "Permission denied";
    }
    touchItem(path);
    return null;
  }

  const [parent, name] = splitPath(path);
  if (!isDir(parent)) return "No such file or directory";
  if (!canWriteDir(parent)) return "Permission denied";
  createFile(parent, name, "");
  return null;
}

export const touchCommand: CommandExecutor = (args, fullCommand) => {
  if (!args.length) {
    return textResponse(fullCommand, ["touch: missing file operand"], "touch");
  }

  const errors = args.flatMap((arg) => {
    const error = touch(resolve(arg));
    return error ? [`touch: cannot touch '${arg}': ${error}`] : [];
  });

  return textResponse(fullCommand, errors, "touch");
};
