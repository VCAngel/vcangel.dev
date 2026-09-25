import { stat } from "../../fs/virtualFS.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { resolve, walk } from "../utils/fs.ts";
import { FAST, textResponse } from "../utils/output.tsx";

export function globToRegExp(glob: string, ignoreCase = false): RegExp {
  const pattern = glob
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*")
    .replace(/\?/g, ".");
  return new RegExp(`^${pattern}$`, ignoreCase ? "i" : "");
}

const baseName = (path: string) =>
  path === "/" ? "/" : path.replace(/\/+$/, "").split("/").pop() ?? path;

// find [path...] [-name GLOB] [-iname GLOB] [-type f|d]
export const findCommand: CommandExecutor = (args, fullCommand) => {
  const firstPredicate = args.findIndex((arg) => arg.startsWith("-"));
  const paths = firstPredicate === -1 ? args : args.slice(0, firstPredicate);
  const predicates = firstPredicate === -1 ? [] : args.slice(firstPredicate);

  let name: RegExp | null = null;
  let type: string | null = null;

  for (let i = 0; i < predicates.length; i += 2) {
    const [predicate, value] = [predicates[i], predicates[i + 1]];
    if (value === undefined) {
      return textResponse(
        fullCommand,
        [`find: missing argument to '${predicate}'`],
        "find",
      );
    }
    if (predicate === "-name" || predicate === "-iname") {
      name = globToRegExp(value, predicate === "-iname");
    } else if (predicate === "-type" && (value === "f" || value === "d")) {
      type = value;
    } else {
      return textResponse(
        fullCommand,
        [`find: unknown predicate '${predicate} ${value}'`],
        "find",
      );
    }
  }

  const lines = (paths.length ? paths : ["."]).flatMap((root) => {
    if (!stat(resolve(root))) {
      return [`find: '${root}': No such file or directory`];
    }

    return walk(root).flatMap((entry) => {
      const entryName = entry.depth === 0 ? baseName(root) : entry.item.name;
      const matches = (!name || name.test(entryName)) &&
        (!type || (type === "d") === (entry.item.type === "dir"));
      return [
        ...(matches ? [entry.path] : []),
        ...(entry.denied ? [`find: '${entry.path}': Permission denied`] : []),
      ];
    });
  });

  return textResponse(fullCommand, lines, "find", FAST);
};
