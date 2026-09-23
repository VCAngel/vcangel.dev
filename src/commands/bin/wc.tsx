import { CommandExecutor } from "../../models/command.model.ts";
import { parseArgs } from "../utils/args.ts";
import { readText } from "../utils/fs.ts";
import { textResponse } from "../utils/output.tsx";

type Counts = [lines: number, words: number, bytes: number];

function count(text: string): Counts {
  return [
    text.match(/\n/g)?.length ?? 0,
    text.split(/\s+/).filter(Boolean).length,
    new TextEncoder().encode(text).length,
  ];
}

// wc [-l -w -c] FILE...
export const wcCommand: CommandExecutor = (args, fullCommand) => {
  const { flags, positional } = parseArgs(args);

  if (!positional.length) {
    return textResponse(fullCommand, ["wc: missing file operand"], "wc");
  }

  const picked = ["l", "w", "c"].map((flag) => flags.has(flag));
  const show = picked.some(Boolean) ? picked : [true, true, true];
  const format = (counts: Counts, label: string) =>
    [
      ...counts.filter((_, i) => show[i]).map((n) => String(n).padStart(4)),
      label,
    ].join(" ");

  const total: Counts = [0, 0, 0];
  let counted = 0;
  const lines = positional.map((arg) => {
    const result = readText("wc", arg);
    if ("error" in result) return result.error;
    const counts = count(result.text);
    counts.forEach((n, i) => (total[i] += n));
    counted++;
    return format(counts, arg);
  });

  if (counted > 1) lines.push(format(total, "total"));

  return textResponse(fullCommand, lines, "wc");
};
