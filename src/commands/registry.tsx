import { catCommand } from "./bin/cat.tsx";
import { cdCommand } from "./bin/cd.tsx";
import { clearCommand } from "./bin/clear.tsx";
import { echoCommand } from "./bin/echo.tsx";
import { historyCommand } from "./bin/history.tsx";
import { lsCommand } from "./bin/list.tsx";
import { pwdCommand } from "./bin/pwd.tsx";
import { whoAmICommand } from "./bin/whoami.tsx";
import { whoIsCommand } from "./bin/whois.tsx";
import { contactCommand } from "./bin/contact.tsx";

import { bannerCommand, helpCommand, projectsCommand } from "./bin/custom.tsx";

import { Command, CommandResponse } from "../models/command.model.ts";

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
  echo: {
    execute: echoCommand,
    help: "Display a line of text",
    usage: "echo [text]",
  },
  history: {
    execute: historyCommand,
    help: "Display the command history",
    usage: "history",
  },
  ls: {
    execute: lsCommand,
    help: "List directory contents",
    usage: "ls [path]",
  },
  pwd: {
    execute: pwdCommand,
    help: "Return working directory name",
    usage: "pwd",
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
  if (!commandString.trim()) {
    return { command: "", response: () => null, route: currentPath };
  }

  const parts = commandString.trim().split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

  // Check if the command exists in the registry
  const command = commands[cmd] ||
    Object.values(commands).find((c) => c.aliases?.includes(cmd));

  if (command) {
    return command.execute(args, commandString);
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
  };
}
