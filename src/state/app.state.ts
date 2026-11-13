import { computed, effect, signal } from "@preact/signals";

import { fs, splitPath } from "../fs/virtualFS.ts";
import { CommandResponse, CompletionMenu } from "../models/command.model.ts";
import { MediaFile } from "../models/fs.model.ts";

// Terminal States
export const commandHistory = signal<CommandResponse[]>([]);
export const displayedHistory = signal<CommandResponse[]>([]);
export const selectedHistoryIndex = signal<number>(0);
export const currentDirectory = signal<string>("/home/guest");

// Terminal states
export const terminalInputRef = signal<HTMLInputElement | null>(null);
export const commandInput = signal<string>("");
export const caretPosition = signal<number>(0);

// NOTE: Tab completion logic lives in commands/utils/complete.ts, importing
// the registry here would be circular (commands import this module)
export const completionMenu = signal<CompletionMenu | null>(null);

// Bumped by `fastfetch` to re-run the Preview panel animation
export const fastfetchRun = signal<number>(0);

// Image viewer (ImageViewer island), opened by `open` and `projects`
export const imageViewer = signal<
  { images: MediaFile[]; index: number } | null
>(null);

// If the working directory gets removed (rm, mv, restore), fall back to the
// closest ancestor that still exists
effect(() => {
  let path = currentDirectory.value;
  while (!fs.value[path] && path !== "/") path = splitPath(path)[0];
  if (path !== currentDirectory.value) currentDirectory.value = path;
});

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
  const isEqualToLastCommand = commandHistory.value.length > 0 &&
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

// Replaces the prompt line and moves the caret.
// WARN: Input value and selection are set synchronously, the keyup handler
// that runs next reads `selectionStart` back into `caretPosition`
export function setCommandLine(line: string, caret = line.length) {
  commandInput.value = line;
  caretPosition.value = caret;
  const input = terminalInputRef.value;
  if (input) {
    input.value = line;
    input.setSelectionRange(caret, caret);
  }
}

export function focusTerminal() {
  terminalInputRef.value?.focus();
}

export function openImageViewer(images: MediaFile[], index: number) {
  imageViewer.value = { images, index };
}

export function closeImageViewer() {
  imageViewer.value = null;
  focusTerminal();
}
