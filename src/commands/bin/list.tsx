import { TypewriterText } from "../../components/TypewriterText.tsx";
import { canRead, canTraverse, modeString } from "../../fs/permissions.ts";
import { joinPath, listChildren, readFile, stat } from "../../fs/virtualFS.ts";
import { DirectoryItem } from "../../models/fs.model.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";
import { parseArgs } from "../utils/args.ts";
import { resolve } from "../utils/fs.ts";

const DIR_CLASSES = "text-[#41F2A9] selection:bg-[#41F2A9]";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface Entry {
  name: string;
  item: DirectoryItem;
  size: number;
}

function formatSize(size: number, human: boolean): string {
  if (!human || size < 1024) return String(size);
  const units = ["K", "M", "G"];
  let value = size / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  return `${value < 10 ? value.toFixed(1) : Math.round(value)}${units[unit]}`;
}

function formatDate(mtime = 0): string {
  const date = new Date(mtime);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${MONTHS[date.getMonth()]} ${String(date.getDate()).padStart(2)} ${
    pad(date.getHours())
  }:${pad(date.getMinutes())}`;
}

function sizeOf(path: string, item: DirectoryItem): number {
  if (item.type === "dir") return 4096;
  const content = readFile(path);
  return content === null
    ? item.size ?? 0
    : new TextEncoder().encode(content).length;
}

function longLine(entry: Entry, human: boolean): string {
  const { item } = entry;
  const owner = item.owner ?? "guest";
  return [
    modeString(item),
    "1",
    owner.padEnd(7),
    (item.group ?? owner).padEnd(7),
    formatSize(entry.size, human).padStart(6),
    formatDate(item.mtime),
    "",
  ].join(" ");
}

function EntryList(
  { entries, long, human, id }: {
    entries: Entry[];
    long: boolean;
    human: boolean;
    id: string;
  },
) {
  if (long) {
    return (
      <ul className="command-wrapper">
        {entries.map((entry, index) => (
          <li key={`${id}-${index}`}>
            <pre>
              <TypewriterText
                text={longLine(entry, human)}
                key={`${id}-${index}-meta`}
                speed={4}
              />
              <span className={entry.item.type === "dir" ? DIR_CLASSES : ""}>
                <TypewriterText text={entry.name} key={`${id}-${index}-tw`} />
              </span>
            </pre>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="inline-flex items-center gap-4 flex-wrap command-wrapper">
      {entries.map((entry, index) => (
        <li key={`${id}-${index}`}>
          <pre className={entry.item.type === "dir" ? DIR_CLASSES : ""}>
            <TypewriterText text={entry.name} key={`${id}-${index}-tw`} />
          </pre>
        </li>
      ))}
    </ul>
  );
}

interface Block {
  header?: string;
  error?: string;
  entries?: Entry[];
}

function listTarget(arg: string, all: boolean): Block {
  const path = resolve(arg);
  const item = stat(path);

  if (!item) {
    return { error: `ls: cannot access '${arg}': No such file or directory` };
  }
  if (!canTraverse(path)) {
    return { error: `ls: cannot access '${arg}': Permission denied` };
  }
  if (item.type !== "dir") {
    return { entries: [{ name: arg, item, size: sizeOf(path, item) }] };
  }
  if (!canRead(path)) {
    return { error: `ls: cannot open directory '${arg}': Permission denied` };
  }

  const children = listChildren(path)
    .filter((child) => all || !child.name.startsWith("."))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((child) => {
      const childPath = joinPath(path, child.name);
      return { name: child.name, item: child, size: sizeOf(childPath, child) };
    });

  const dots: Entry[] = all
    ? [
      { name: ".", item, size: 4096 },
      { name: "..", item: stat(resolve(`${arg}/..`)) ?? item, size: 4096 },
    ]
    : [];

  return { entries: [...dots, ...children] };
}

export const lsCommand: CommandExecutor = (args, fullCommand) => {
  const { flags, positional } = parseArgs(args);
  const all = flags.has("a");
  const long = flags.has("l");
  const human = flags.has("h");

  const targets = positional.length ? positional : ["."];
  // Snapshot now: response() re-renders on every new command
  const blocks = targets.map((target): Block => ({
    ...listTarget(target, all),
    header: targets.length > 1 ? `${target}:` : undefined,
  }));

  return {
    command: fullCommand,
    route: currentDirectory.value,
    response: () => (
      <>
        {blocks.map((block, index) => (
          <div key={`ls_block-${index}`}>
            {block.header && <pre>{block.header}</pre>}
            {block.error && (
              <pre>
                <TypewriterText
                  text={block.error}
                  key={`ls_block-${index}-err`}
                />
              </pre>
            )}
            {block.entries && (
              <EntryList
                entries={block.entries}
                long={long}
                human={human}
                id={`ls_block-${index}`}
              />
            )}
          </div>
        ))}
      </>
    ),
  };
};
