import { USERS } from "../../data/users.ts";
import { canRead } from "../../fs/permissions.ts";
import { listChildren, resolvePath } from "../../fs/virtualFS.ts";
import {
  Command,
  CompletionMatch,
  CompletionSource,
} from "../../models/command.model.ts";
import {
  caretPosition,
  commandInput,
  completionMenu,
  currentDirectory,
  focusTerminal,
  setCommandLine,
  terminalInputRef,
} from "../../state/app.state.ts";
import { commandFlags, commandNames, lookupCommand } from "../registry.tsx";
import { tokenize } from "./args.ts";

interface Completion {
  start: number; // Where the completed word begins in the line
  word: string; // Its text, quotes stripped
  matches: CompletionMatch[];
}

const toMatch = (name: string): CompletionMatch => ({
  value: name,
  label: name,
});

// Index after the last unquoted whitespace, same rules as `tokenize`
function wordStart(text: string): number {
  let start = 0;
  let quote: string | null = null;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quote) {
      if (char === quote) quote = null;
    } else if (char === "'" || char === '"') {
      quote = char;
    } else if (/\s/.test(char)) {
      start = i + 1;
    }
  }
  return start;
}

// Case-sensitive first, case-insensitive only when that finds nothing
function byPrefix(matches: CompletionMatch[], prefix: string) {
  const exact = matches.filter(({ label }) => label.startsWith(prefix));
  if (exact.length) return exact;
  const lower = prefix.toLowerCase();
  return matches.filter(({ label }) => label.toLowerCase().startsWith(lower));
}

// "-r, -R, --recursive" → -r, -R, --recursive, sharing one description
function flagMatches(command: Command): CompletionMatch[] {
  return commandFlags(command).flatMap(({ flag, description }) =>
    flag.split(",")
      .map((part) => part.trim().split(" ")[0])
      .filter((name) => name.startsWith("-"))
      .map((name) => ({ ...toMatch(name), description }))
  );
}

function pathMatches(word: string, dirsOnly: boolean): CompletionMatch[] {
  if (word === "~") return [{ value: "~/", label: "~/", dir: true }];

  const slash = word.lastIndexOf("/");
  const dirPart = word.slice(0, slash + 1);
  const prefix = word.slice(slash + 1);
  if (prefix === "..") {
    return [{ value: `${dirPart}../`, label: "../", dir: true }];
  }

  const base = dirPart
    ? resolvePath(dirPart, currentDirectory.value)
    : currentDirectory.value;
  if (!canRead(base)) return [];

  const children = listChildren(base)
    .filter((item) => !dirsOnly || item.type === "dir")
    .filter((item) => prefix.startsWith(".") || !item.name.startsWith("."))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item): CompletionMatch => {
      if (item.type !== "dir") {
        return { value: dirPart + item.name, label: item.name };
      }
      const label = `${item.name}/`;
      return { value: dirPart + label, label, dir: true };
    });
  return byPrefix(children, prefix);
}

function sourceMatches(
  source: CompletionSource | undefined,
  word: string,
): CompletionMatch[] {
  switch (source) {
    case "paths":
    case "dirs":
      return pathMatches(word, source === "dirs");
    case "commands":
      return byPrefix(commandNames().sort().map(toMatch), word);
    case "users":
      return byPrefix(Object.keys(USERS).sort().map(toMatch), word);
    default:
      return [];
  }
}

// Matches for the word that ends at `caret`, located by the command before it
function complete(line: string, caret: number): Completion {
  const before = line.slice(0, caret);
  const start = wordStart(before);
  const word = tokenize(before.slice(start))[0] ?? "";
  let words = tokenize(before.slice(0, start));

  // `sudo ls -<TAB>` completes ls, `sudo -<TAB>` completes sudo's own flags
  while (words.length && lookupCommand(words[0])?.[1].wrapsCommand) {
    const next = words.length > 1 ? words[1] : word;
    if (next.startsWith("-")) break;
    words = words.slice(1);
  }

  return { start, word, matches: matchesFor(words, word) };
}

function matchesFor(words: string[], word: string): CompletionMatch[] {
  if (!words.length) return sourceMatches("commands", word);
  const found = lookupCommand(words[0]);
  // NOTE: Unknown commands complete paths, like zsh's default
  if (!found) return word.startsWith("-") ? [] : sourceMatches("paths", word);
  if (word.startsWith("-")) return byPrefix(flagMatches(found[1]), word);
  return sourceMatches(found[1].complete, word);
}

// Longest shared prefix, case-sensitive
function commonPrefix(values: string[]): string {
  const [first = "", ...rest] = values;
  let length = first.length;
  for (const value of rest) {
    let i = 0;
    while (i < length && value[i] === first[i]) i++;
    length = i;
  }
  return first.slice(0, length);
}

// Quotes what `tokenize` would split, after any `~/` so it still expands:
// "~/my dir/" → ~/'my dir/'. Left open for a partial prefix: 'my d
function quoteArg(text: string, closed = true): string {
  const home = text.startsWith("~/") ? "~/" : "";
  const rest = text.slice(home.length);
  if (!/[\s'"]/.test(rest)) return text;
  const quote = rest.includes("'") ? '"' : "'";
  return home + quote + rest + (closed ? quote : "");
}

// Final insert: dirs stay open for the next Tab, the rest get a space
function insertMatch(head: string, match: CompletionMatch, tail: string) {
  const suffix = match.dir || tail.startsWith(" ") ? "" : " ";
  const inserted = quoteArg(match.value) + suffix;
  setCommandLine(head + inserted + tail, head.length + inserted.length);
}

// zsh-style Tab: unique match → insert it, several → insert their common
// prefix and list them, Tab again → cycle (`step` -1 = Shift+Tab)
export function tabComplete(step: 1 | -1) {
  const menu = completionMenu.value;

  if (menu && commandInput.value === menu.line) {
    const count = menu.matches.length;
    const selected = menu.selected === -1
      ? (step === 1 ? 0 : count - 1)
      : (menu.selected + step + count) % count;
    const inserted = quoteArg(menu.matches[selected].value);
    const line = menu.head + inserted + menu.tail;
    setCommandLine(line, menu.head.length + inserted.length);
    completionMenu.value = { ...menu, selected, line };
    return;
  }

  const line = commandInput.value;
  const caret = terminalInputRef.value?.selectionStart ?? caretPosition.value;
  const { start, word, matches } = complete(line, caret);
  const head = line.slice(0, start);
  const tail = line.slice(caret);
  completionMenu.value = null;

  if (matches.length === 1) insertMatch(head, matches[0], tail);
  if (matches.length < 2) return;

  const prefix = commonPrefix(matches.map(({ value }) => value));
  const inserted = prefix.length > word.length
    ? quoteArg(prefix, false)
    : line.slice(start, caret);
  const next = head + inserted + tail;
  setCommandLine(next, head.length + inserted.length);
  completionMenu.value = { matches, selected: -1, head, tail, line: next };
}

// Click/tap on a listed match
export function pickCompletion(index: number) {
  const menu = completionMenu.value;
  if (!menu) return;
  completionMenu.value = null;
  insertMatch(menu.head, menu.matches[index], menu.tail);
  focusTerminal();
}
