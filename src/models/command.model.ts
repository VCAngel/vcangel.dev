import { JSX } from "preact/jsx-runtime";

import { User } from "./user.model.ts";

export type CommandExecutor = (
  args: string[],
  fullCommand: string,
) => CommandResponse;

export interface CommandResponse {
  route: string;
  command: string;
  response: () => JSX.Element | null;
  user?: User; // Who ran it, stamped by executeCommand
  prompt?: string; // Replaces the user@host prompt (e.g. "Password:")
}

export interface CommandFlag {
  flag: string; // e.g. "-r, -R" or "-n N"
  description: string;
}

export interface Command {
  execute: CommandExecutor;
  help: string;
  usage?: string;
  aliases?: string[];
  flags?: CommandFlag[]; // Listed by `help <cmd>` / `<cmd> --help`
  wrapsCommand?: true; // Args after the first one belong to another command (sudo)
}
