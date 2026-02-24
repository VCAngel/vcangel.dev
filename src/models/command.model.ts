import { JSX } from "preact/jsx-runtime";

export type CommandExecutor = (
  args: string[],
  fullCommand: string,
) => CommandResponse;

export interface CommandResponse {
  route: string;
  command: string;
  response: () => JSX.Element | null;
}

export interface Command {
  execute: CommandExecutor;
  help: string;
  usage?: string;
  aliases?: string[];
}
