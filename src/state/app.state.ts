import { computed, signal } from "@preact/signals";

import { fs } from "../fs/virtualFS.ts";
import { CommandResponse } from "../models/command.model.ts";

// Terminal States
export const commandHistory = signal<CommandResponse[]>([]);
export const displayedHistory = signal<CommandResponse[]>([]);
export const selectedHistoryIndex = signal<number>(0);
export const currentDirectory = signal<string>("/home/guest");

// Terminal states
export const terminalInputRef = signal<HTMLInputElement | null>(null);
export const commandInput = signal<string>("");
export const commandOutput = signal<string>("");
export const caretPosition = signal<number>(0);

// Computed states
export const currentDirectoryContents = computed(() => {
  return fs.value[currentDirectory.value] || [];
});

// State actions
export function changeDirectory(newPath: string) {
  if (fs.value[newPath]) {
    currentDirectory.value = newPath;
    return true;
  }
  return false;
}

export function addToHistory(response: CommandResponse) {
  const isEqualToLastCommand =
    commandHistory.value.length > 0 &&
    response.command ===
      commandHistory.value[commandHistory.value.length - 1].command;

  if (response.command && !isEqualToLastCommand) {
    commandHistory.value = [...commandHistory.value, response];
  }

  if (response.command === "clear") {
    clearHistory();
    return;
  }

  selectedHistoryIndex.value = commandHistory.value.length; // Reset history navigation index
  displayedHistory.value = [...displayedHistory.value, response];
  selectedHistoryIndex.value = commandHistory.value.length;
}

export function clearHistory() {
  displayedHistory.value = [];
  selectedHistoryIndex.value = commandHistory.value.length;
}

export function focusTerminal() {
  terminalInputRef.value?.focus();
}
