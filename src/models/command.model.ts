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

export interface Command {
  execute: CommandExecutor;
  help: string;
  usage?: string;
  aliases?: string[];
}
