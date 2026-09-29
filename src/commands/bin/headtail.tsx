import { CommandExecutor } from "../../models/command.model.ts";
import { parseArgs } from "../utils/args.ts";
import { readText } from "../utils/fs.ts";
import { FAST, textResponse, toLines } from "../utils/output.tsx";

// Shared body of `head` and `tail`: [-n N] FILE...
function headTailCommand(
  name: "head" | "tail",
  pick: (lines: string[], count: number) => string[],
): CommandExecutor {
  return (args, fullCommand) => {
    const { values, positional } = parseArgs(args, ["n"]);
    const count = values.n === undefined ? 10 : Number(values.n);

    if (!Number.isInteger(count) || count < 0) {
      return textResponse(
        fullCommand,
        [`${name}: invalid number of lines: '${values.n}'`],
        name,
      );
    }
    if (!positional.length) {
      return textResponse(fullCommand, [`${name}: missing file operand`], name);
    }

    const multiple = positional.length > 1;
    const lines = positional.flatMap((arg, index) => {
      const result = readText(name, arg);
      if ("error" in result) return [result.error];
      const body = pick(toLines(result.text), count);
      if (!multiple) return body;
      return [...(index ? [""] : []), `==> ${arg} <==`, ...body];
    });

    return textResponse(fullCommand, lines, name, FAST);
  };
}

export const headCommand = headTailCommand(
  "head",
  (lines, count) => lines.slice(0, count),
);

export const tailCommand = headTailCommand(
  "tail",
  (lines, count) => (count ? lines.slice(-count) : []),
);
