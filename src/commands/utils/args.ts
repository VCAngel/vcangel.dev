// Splits a command line on whitespace, keeping 'single' / "double" quoted
// chunks together (quotes are stripped). An unclosed quote runs to the end.
// Unquoted `~` / `~/...` expands to `home`, like a real shell.
export function tokenize(input: string, home?: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let quote: string | null = null;
  let hasToken = false;
  let quotedStart = false;

  const push = () => {
    const expand = home && !quotedStart &&
      (current === "~" || current.startsWith("~/"));
    tokens.push(expand ? home + current.slice(1) : current);
  };

  for (const char of input.trim()) {
    if (quote) {
      if (char === quote) quote = null;
      else current += char;
    } else if (char === "'" || char === '"') {
      if (!hasToken) quotedStart = true;
      quote = char;
      hasToken = true;
    } else if (/\s/.test(char)) {
      if (hasToken) push();
      current = "";
      hasToken = false;
      quotedStart = false;
    } else {
      current += char;
      hasToken = true;
    }
  }
  if (hasToken) push();

  return tokens;
}

export interface ParsedArgs {
  flags: Set<string>;
  values: Record<string, string>;
  positional: string[];
}

// `-la` → flags l + a, `--force` → flag "force", `valueFlags` take the next
// token (or the rest of the cluster) as a value: `-n 5` / `-n5`.
export function parseArgs(
  args: string[],
  valueFlags: string[] = [],
): ParsedArgs {
  const flags = new Set<string>();
  const values: Record<string, string> = {};
  const positional: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--") {
      positional.push(...args.slice(i + 1));
      break;
    }

    if (arg.startsWith("--") && arg.length > 2) {
      flags.add(arg.slice(2));
    } else if (arg.startsWith("-") && arg.length > 1) {
      for (let j = 1; j < arg.length; j++) {
        const flag = arg[j];
        if (valueFlags.includes(flag)) {
          values[flag] = arg.slice(j + 1) || args[++i] || "";
          break;
        }
        flags.add(flag);
      }
    } else {
      positional.push(arg);
    }
  }

  return { flags, values, positional };
}
