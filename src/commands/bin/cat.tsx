import { CommandExecutor } from "../../models/command.model.ts";
import { readText } from "../utils/fs.ts";
import { FAST, textResponse, toLines } from "../utils/output.tsx";

export const catCommand: CommandExecutor = (args, fullCommand) => {
  if (args.length === 0) {
    return textResponse(fullCommand, ["cat: missing file operand"], "cat");
  }

  // Snapshot contents now: response() re-renders on every new command
  const lines = args.flatMap((arg) => {
    const result = readText("cat", arg);
    return "error" in result ? [result.error] : toLines(result.text);
  });

  return textResponse(fullCommand, lines, "cat", FAST);
};
