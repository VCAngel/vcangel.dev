import { computed, signal } from "@preact/signals";
import { ICommandResponse, IDirectoryItem } from "../models/command.model.ts";

// Terminal States
export const commandHistory = signal<ICommandResponse[]>([]);
export const displayedHistory = signal<ICommandResponse[]>([]);
export const selectedHistoryIndex = signal<number>(0);
export const currentDirectory = signal<string>("/home/guest");
export const commandInput = signal<string>("banner");
export const commandOutput = signal<string>("");
export const caretPosition = signal<number>(0);

// FS states
const parentRoutes: IDirectoryItem[] = [
  {
    name: "/",
    type: "dir",
    ignoredByList: true,
  },
  {
    name: "..",
    type: "dir",
    ignoredByList: true,
  },
];

export const fileSystem = signal<Record<string, IDirectoryItem[]>>({
  "/": [{ name: "home", type: "dir" }],
  "/home": [
    ...parentRoutes,
    {
      name: "guest",
      type: "dir",
    },
  ],
  "/home/guest": [
    ...parentRoutes,
    {
      name: "Documents",
      type: "dir",
    },
    {
      name: "Images",
      type: "dir",
    },
    {
      name: "README.md",
      type: "file",
    },
  ],
  "/home/guest/Documents": [
    ...parentRoutes,
    {
      name: "resume.pdf",
      type: "file",
    },
  ],
  "/home/guest/Images": [
    ...parentRoutes,
    { name: "me.png", type: "file" },
    { name: "phrog.gif", type: "file" },
    { name: "le_meme.png", type: "file" },
  ],
});

// Computed states
export const currentDirectoryContents = computed(() => {
  return fileSystem.value[currentDirectory.value] || [];
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
  if (fileSystem.value[newPath]) {
    currentDirectory.value = newPath;
    return true;
  }
  return false;
}
