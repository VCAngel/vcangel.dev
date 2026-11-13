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

// What Tab completes in a command's arguments
export type CompletionSource = "paths" | "dirs" | "commands" | "users";

export interface Command {
  execute: CommandExecutor;
  help: string;
  usage?: string;
  aliases?: string[];
  flags?: CommandFlag[]; // Listed by `help <cmd>` / `<cmd> --help`
  wrapsCommand?: true; // Args after the first one belong to another command (sudo)
  complete?: CompletionSource; // NOTE: Unset = takes no args, Tab offers nothing
}

export interface CompletionMatch {
  value: string; // Inserted text, dirs end in "/"
  label: string; // Shown in the list
  dir?: true;
  description?: string; // Flags only
}

// Matches listed under the prompt after an ambiguous Tab
export interface CompletionMenu {
  matches: CompletionMatch[];
  selected: number; // -1 while only listed, cycling starts on the next Tab
  head: string; // Line before the completed word
  tail: string; // Line after the caret
  line: string; // Line as Tab left it; any other edit ends the menu
}
