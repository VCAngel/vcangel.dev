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

import { bannerCommand, helpCommand } from "./bin/custom.tsx";

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
  },
  echo: {
    execute: echoCommand,
    help: "Display a line of text",
    usage: "echo [text] [> file | >> file]",
  },
  find: {
    execute: findCommand,
    help: "Search for files in a directory hierarchy",
    usage: "find [path ...] [-name glob] [-iname glob] [-type f|d]",
  },
  grep: {
    execute: grepCommand,
    help: "Print lines that match a pattern",
    usage: "grep [-i -n -r -v] pattern [file ...]",
  },
  head: {
    execute: headCommand,
    help: "Output the first part of files",
    usage: "head [-n lines] file ...",
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
  },
  mkdir: {
    execute: mkdirCommand,
    help: "Make directories",
    usage: "mkdir [-p] directory ...",
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
  },
  rmdir: {
    execute: rmdirCommand,
    help: "Remove empty directories",
    usage: "rmdir directory ...",
  },
  tail: {
    execute: tailCommand,
    help: "Output the last part of files",
    usage: "tail [-n lines] file ...",
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
  },
  wc: {
    execute: wcCommand,
    help: "Print line, word and byte counts",
    usage: "wc [-l -w -c] file ...",
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
  const command = Object.hasOwn(commands, cmd)
    ? commands[cmd]
    : Object.values(commands).find((c) => c.aliases?.includes(cmd));

  if (command) {
    return { user, ...command.execute(args, commandString) };
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
