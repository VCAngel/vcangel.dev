import { stat } from "../../fs/virtualFS.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { parseArgs } from "../utils/args.ts";
import { readText, resolve, walk } from "../utils/fs.ts";
import { FAST, textResponse, toLines } from "../utils/output.tsx";

function toRegExp(pattern: string, ignoreCase: boolean): RegExp {
  const flags = ignoreCase ? "i" : "";
  try {
    return new RegExp(pattern, flags);
  } catch {
    // Invalid regex → match it literally
    return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), flags);
  }
}

// grep [-i -n -r -v] PATTERN FILE... (no pipes, files only)
export const grepCommand: CommandExecutor = (args, fullCommand) => {
  const { flags, positional } = parseArgs(args);
  const [pattern, ...targets] = positional;
  const recursive = flags.has("r") || flags.has("R");

  if (pattern === undefined) {
    return textResponse(
      fullCommand,
      ["usage: grep [-i -n -r -v] pattern [file ...]"],
      "grep",
    );
  }
  if (!targets.length && !recursive) {
    return textResponse(
      fullCommand,
      ["grep: no input files (pipes aren't supported here, pass a file)"],
      "grep",
    );
  }

  const regex = toRegExp(pattern, flags.has("i"));
  const invert = flags.has("v");
  const output: string[] = [];

  // Expand directories when -r, keeping display paths
  const files: string[] = [];
  for (const target of targets.length ? targets : ["."]) {
    const item = stat(resolve(target));
    if (item?.type !== "dir") {
      files.push(target);
    } else if (!recursive) {
      output.push(`grep: ${target}: Is a directory`);
    } else {
      for (const entry of walk(target)) {
        if (entry.denied) {
          output.push(`grep: ${entry.path}: Permission denied`);
        } else if (entry.item.type !== "dir") {
          files.push(entry.path);
        }
      }
    }
  }

  const showName = recursive || files.length > 1;
  for (const file of files) {
    const result = readText("grep", file);
    if ("error" in result) {
      if (!result.binary) output.push(result.error);
      continue;
    }
    toLines(result.text).forEach((line, index) => {
      if (regex.test(line) === invert) return;
      output.push(
        `${showName ? `${file}:` : ""}${
          flags.has("n") ? `${index + 1}:` : ""
        }${line}`,
      );
    });
  }

  return textResponse(fullCommand, output, "grep", FAST);
};
