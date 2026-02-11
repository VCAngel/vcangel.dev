import { computed, signal } from "@preact/signals";

import { fs } from "../fs/virtualFS.ts";
import { ICommandResponse } from "../models/command.model.ts";

// Terminal States
export const commandHistory = signal<ICommandResponse[]>([]);
export const displayedHistory = signal<ICommandResponse[]>([]);
export const selectedHistoryIndex = signal<number>(0);
export const currentDirectory = signal<string>("/home/guest");
export const commandInput = signal<string>("banner");
export const commandOutput = signal<string>("");
export const caretPosition = signal<number>(0);

// Computed states
export const currentDirectoryContents = computed(() => {
  return fs.value[currentDirectory.value] || [];
});

// State actions
export function addToHistory(response: ICommandResponse) {
  const isEqualToLastCommand =
    commandHistory.value.length > 0 &&
    response.command ===
      commandHistory.value[commandHistory.value.length - 1].command;

  if (response.command !== "" && !isEqualToLastCommand) {
    commandHistory.value = [...commandHistory.value, response];
  }

  if (response.command === "clear") {
    displayedHistory.value = [];
    return;
  }

  displayedHistory.value = [...displayedHistory.value, response];
}

export function changeDirectory(newPath: string) {
  if (fs.value[newPath]) {
    currentDirectory.value = newPath;
    return true;
  }
  return false;
}
