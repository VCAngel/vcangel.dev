import { canRead, canWriteDir } from "../../fs/permissions.ts";
import {
  copyPath,
  isDir,
  joinPath,
  listChildren,
  movePath,
  splitPath,
  stat,
} from "../../fs/virtualFS.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";
import { parseArgs } from "../utils/args.ts";
import { resolve } from "../utils/fs.ts";
import { textResponse } from "../utils/output.tsx";

// Shared body of `mv` and `cp`: SOURCE... DEST, where DEST may be a directory
function transferCommand(name: "mv" | "cp"): CommandExecutor {
  const copy = name === "cp";
  const verb = copy ? "copy" : "move";

  return (args, fullCommand) => {
    const { flags, positional } = parseArgs(args);
    const recursive = flags.has("r") || flags.has("R");

    if (positional.length < 2) {
      const message = positional.length
        ? `${name}: missing destination file operand after '${positional[0]}'`
        : `${name}: missing file operand`;
      return textResponse(fullCommand, [message], name);
    }

    const destArg = positional[positional.length - 1];
    const destPath = resolve(destArg);
    const destIsDir = isDir(destPath);
    const sources = positional.slice(0, -1);

    if (sources.length > 1 && !destIsDir) {
      return textResponse(
        fullCommand,
        [`${name}: target '${destArg}' is not a directory`],
        name,
      );
    }

    const errors: string[] = [];
    for (const src of sources) {
      const srcPath = resolve(src);
      const item = stat(srcPath);
      const finalPath = destIsDir && item
        ? joinPath(destPath, item.name)
        : destPath;
      const [srcParent] = splitPath(srcPath);
      const [finalParent] = splitPath(finalPath);
      const existing = stat(finalPath);

      const reason = !item
        ? `cannot stat '${src}': No such file or directory`
        : srcPath === "/"
        ? `cannot ${verb} '/': Device or resource busy`
        : copy && item.type === "dir" && !recursive
        ? `-r not specified; omitting directory '${src}'`
        : finalPath === srcPath
        ? `'${src}' and '${destArg}' are the same file`
        : finalPath.startsWith(`${srcPath}/`)
        ? `cannot ${verb} '${src}' to a subdirectory of itself, '${destArg}'`
        : !isDir(finalParent)
        ? `cannot ${verb} '${src}' to '${destArg}': No such file or directory`
        : existing?.type === "dir" && item.type !== "dir"
        ? `cannot overwrite directory '${destArg}' with non-directory`
        : existing?.type === "dir" && listChildren(finalPath).length
        ? `cannot ${verb} '${src}' to '${destArg}': Directory not empty`
        : (copy ? !canRead(srcPath) : !canWriteDir(srcParent)) ||
            !canWriteDir(finalParent)
        ? `cannot ${verb} '${src}' to '${destArg}': Permission denied`
        : null;

      if (reason) {
        errors.push(`${name}: ${reason}`);
        continue;
      }

      if (copy) {
        copyPath(srcPath, finalPath);
        continue;
      }

      movePath(srcPath, finalPath);
      // Follow the working directory if it was moved along
      const cwd = currentDirectory.value;
      if (cwd === srcPath || cwd.startsWith(`${srcPath}/`)) {
        currentDirectory.value = finalPath + cwd.slice(srcPath.length);
      }
    }

    return textResponse(fullCommand, errors, name);
  };
}

export const mvCommand = transferCommand("mv");
export const cpCommand = transferCommand("cp");
