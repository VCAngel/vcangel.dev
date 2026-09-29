import { catCommand } from "./bin/cat.tsx";
import { cdCommand } from "./bin/cd.tsx";
import { clearCommand } from "./bin/clear.tsx";
import { echoCommand } from "./bin/echo.tsx";
import { historyCommand } from "./bin/history.tsx";
import { lsCommand } from "./bin/list.tsx";
import { pwdCommand } from "./bin/pwd.tsx";
import { whoAmICommand } from "./bin/whoami.tsx";
import { contactCommand } from "./bin/contact.tsx";
import { projectsCommand } from "./bin/projects.tsx";
import { mkdirCommand } from "./bin/mkdir.tsx";
import { touchCommand } from "./bin/touch.tsx";
import { rmCommand, rmdirCommand } from "./bin/rm.tsx";
import { cpCommand, mvCommand } from "./bin/transfer.tsx";
import { treeCommand } from "./bin/tree.tsx";
import { findCommand } from "./bin/find.tsx";
import { headCommand, tailCommand } from "./bin/headtail.tsx";
import { wcCommand } from "./bin/wc.tsx";
import { grepCommand } from "./bin/grep.tsx";
import {
  exitCommand,
  groupsCommand,
  suCommand,
  sudoCommand,
  usersCommand,
} from "./bin/session.tsx";
import { fastfetchCommand } from "./bin/fastfetch.tsx";

import {
  bannerCommand,
  commandHelpResponse,
  helpCommand,
  usesShortHelpFlag,
} from "./bin/custom.tsx";

import { USERS } from "../data/users.ts";
import { Command, CommandResponse } from "../models/command.model.ts";
import { currentUser } from "../state/session.state.ts";
import { tokenize } from "./utils/args.ts";

const linux: Record<string, Command> = {
  cat: {
    execute: catCommand,
    help: "Concatenate and print file contents",
    usage: "cat [file ...]",
  },
  cd: {
    execute: cdCommand,
    help: "Change the current directory",
    usage: "cd [path]",
  },
  clear: {
    execute: clearCommand,
    help: "Clear the terminal screen",
    usage: "clear",
  },
  cp: {
    execute: cpCommand,
    help: "Copy files and directories",
    usage: "cp [-r] source ... dest",
    flags: [{ flag: "-r, -R", description: "Copy directories recursively" }],
  },
  echo: {
    execute: echoCommand,
    help: "Display a line of text",
    usage: "echo [text] [> file | >> file]",
    flags: [
      { flag: "> file", description: "Write the text to file (overwrites)" },
      { flag: ">> file", description: "Append the text to file" },
    ],
  },
  exit: {
    execute: exitCommand,
    help: "Log out of the current user, or close the terminal",
    usage: "exit",
    aliases: ["logout"],
  },
  find: {
    execute: findCommand,
    help: "Search for files in a directory hierarchy",
    usage: "find [path ...] [-name glob] [-iname glob] [-type f|d]",
    flags: [
      { flag: "-name GLOB", description: "Match names (* and ? wildcards)" },
      { flag: "-iname GLOB", description: "Like -name, but case-insensitive" },
      { flag: "-type f|d", description: "Only files (f) or directories (d)" },
    ],
  },
  grep: {
    execute: grepCommand,
    help: "Print lines that match a pattern",
    usage: "grep [-i -n -r -v] pattern [file ...]",
    flags: [
      { flag: "-i", description: "Ignore case" },
      { flag: "-n", description: "Prefix each match with its line number" },
      { flag: "-r, -R", description: "Search directories recursively" },
      { flag: "-v", description: "Show lines that don't match" },
    ],
  },
  groups: {
    execute: groupsCommand,
    help: "Print the groups a user is in",
    usage: "groups [user ...]",
  },
  head: {
    execute: headCommand,
    help: "Output the first part of files",
    usage: "head [-n lines] file ...",
    flags: [{ flag: "-n N", description: "Print the first N lines (10)" }],
  },
  history: {
    execute: historyCommand,
    help: "Display the command history",
    usage: "history",
  },
  ls: {
    execute: lsCommand,
    help: "List directory contents",
    usage: "ls [-a -l -h] [path ...]",
    flags: [
      { flag: "-a", description: "Include hidden files, . and .." },
      { flag: "-l", description: "Long format: perms, owner, size, date" },
      { flag: "-h", description: "Human-readable sizes (with -l)" },
    ],
  },
  mkdir: {
    execute: mkdirCommand,
    help: "Make directories",
    usage: "mkdir [-p] directory ...",
    flags: [
      { flag: "-p", description: "Create parents as needed, ok if existing" },
    ],
  },
  mv: {
    execute: mvCommand,
    help: "Move (rename) files",
    usage: "mv source ... dest",
  },
  pwd: {
    execute: pwdCommand,
    help: "Return working directory name",
    usage: "pwd",
  },
  rm: {
    execute: rmCommand,
    help: "Remove files or directories",
    usage: "rm [-r -f] file ...",
    flags: [
      {
        flag: "-r, -R, --recursive",
        description: "Remove directories and their contents",
      },
      { flag: "-f, --force", description: "Ignore missing files, no errors" },
    ],
  },
  rmdir: {
    execute: rmdirCommand,
    help: "Remove empty directories",
    usage: "rmdir directory ...",
  },
  su: {
    execute: suCommand,
    help: "Switch user",
    usage: "su [user]",
  },
  sudo: {
    execute: sudoCommand,
    help: "Execute a command as root",
    usage: "sudo [-i | -s | command]",
    flags: [{ flag: "-i, -s", description: "Open a root shell" }],
    wrapsCommand: true,
  },
  tail: {
    execute: tailCommand,
    help: "Output the last part of files",
    usage: "tail [-n lines] file ...",
    flags: [{ flag: "-n N", description: "Print the last N lines (10)" }],
  },
  touch: {
    execute: touchCommand,
    help: "Create empty files or update timestamps",
    usage: "touch file ...",
  },
  tree: {
    execute: treeCommand,
    help: "List contents of directories in a tree-like format",
    usage: "tree [-a] [path]",
    flags: [{ flag: "-a", description: "Include hidden files" }],
  },
  users: {
    execute: usersCommand,
    help: "Print the users logged in",
    usage: "users",
  },
  wc: {
    execute: wcCommand,
    help: "Print line, word and byte counts",
    usage: "wc [-l -w -c] file ...",
    flags: [
      { flag: "-l", description: "Count lines" },
      { flag: "-w", description: "Count words" },
      { flag: "-c", description: "Count bytes" },
    ],
  },
  whoami: {
    execute: whoAmICommand,
    help: "Display the current user",
    usage: "whoami",
  },
};

const custom: Record<string, Command> = {
  help: {
    execute: helpCommand,
    help: "Display help information for commands",
    aliases: ["?"],
  },
  banner: {
    execute: bannerCommand,
    help: "Display welcome banner",
  },
  contact: {
    execute: contactCommand,
    help: "Display contact information",
    usage: "contact",
  },
  fastfetch: {
    execute: fastfetchCommand,
    help: "Fetch system (and my) information into the profile panel",
    usage: "fastfetch",
    aliases: ["neofetch"],
  },
  projects: {
    execute: projectsCommand,
    help: "Display projects information",
    usage: "projects",
  },
};

export const commands: Record<string, Command> = {
  ...custom,
  divider: {
    execute: () => ({
      command: "divider",
      route: "",
      response: () => null,
    }),
    help: "Divider for Linux commands",
  }, // NOTE: This is a special command that doesn't render anything, used to visually separate custom and linux commands in the help output
  ...linux,
};

// Resolves a name or alias to its registry entry (the divider isn't runnable)
export function lookupCommand(name: string): [string, Command] | undefined {
  if (name === "divider") return undefined;
  if (Object.hasOwn(commands, name)) return [name, commands[name]];
  return Object.entries(commands).find(([, c]) => c.aliases?.includes(name));
}

// `--help` anywhere before `--`; `-h` too unless the command owns it (ls -h).
// Wrapper commands only check their first arg: `sudo ls --help` is ls' help.
function wantsHelp(args: string[], command: Command): boolean {
  const end = args.indexOf("--");
  const options = command.wrapsCommand
    ? args.slice(0, 1)
    : end === -1
    ? args
    : args.slice(0, end);
  const shortTaken = usesShortHelpFlag(command);
  return options.some((arg) =>
    arg === "--help" || (arg === "-h" && !shortTaken)
  );
}

export function executeCommand(
  commandString: string,
  currentPath: string,
): CommandResponse {
  // Stamped so the history prompt keeps who typed it, even if the command
  // switches users (su / exit)
  const user = currentUser.value;

  if (!commandString.trim()) {
    return { command: "", response: () => null, route: currentPath, user };
  }

  const [cmd = "", ...args] = tokenize(commandString, USERS[user].home);

  // Check if the command exists in the registry
  const found = lookupCommand(cmd);

  if (found) {
    const [name, command] = found;
    const response = wantsHelp(args, command)
      ? commandHelpResponse(name, command, commandString)
      : command.execute(args, commandString);
    return { user, ...response };
  }

  // Default response for unknown commands
  return {
    command: commandString,
    response: () => (
      <pre>
        Command not found: {cmd}. For a list of commands, type{" "}
        <code className="text-indigo-400" style="text-shadow:0 0 2px #818cf8;">
          help
        </code>{" "}
      </pre>
    ),
    route: currentPath,
    user,
  };
}
