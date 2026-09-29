import { batch, effect } from "@preact/signals";

import { isUser } from "../data/users.ts";
import { fileContents, fs, resetFS } from "../fs/virtualFS.ts";
import { clearHistory, commandHistory, currentDirectory } from "./app.state.ts";
import {
  currentUser,
  pendingPrompt,
  sessionExited,
  systemNuked,
  userStack,
} from "./session.state.ts";

// Everything the visitor changes lives under this prefix in localStorage
const PREFIX = "vcangel.";
const STATE_KEY = `${PREFIX}state.v1`;

let started = false;

// Client-only: restores the saved session, then saves on every change.
// Called from an island effect so SSR markup always matches the seed state.
export function startPersistence() {
  if (started) return;
  started = true;

  try {
    const raw = localStorage.getItem(STATE_KEY);
    const data = raw ? JSON.parse(raw) : null;
    if (data && Array.isArray(data.fs?.["/"])) {
      batch(() => {
        fs.value = data.fs;
        fileContents.value = data.contents ?? {};
        currentUser.value = isUser(data.user) ? data.user : "guest";
        systemNuked.value = data.nuked === true;
      });
    }
  } catch {
    // Corrupt or blocked storage → keep the seed state
  }

  effect(() => {
    const snapshot = JSON.stringify({
      fs: fs.value,
      contents: fileContents.value,
      user: currentUser.value,
      nuked: systemNuked.value,
    });
    try {
      localStorage.setItem(STATE_KEY, snapshot);
    } catch {
      // Storage full or disabled: session keeps working in memory
    }
  });
}

// Back to factory settings: seed FS, guest user, empty terminal
export function restoreSystem() {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  } catch {
    // Nothing to clear
  }

  batch(() => {
    resetFS();
    currentUser.value = "guest";
    userStack.value = [];
    pendingPrompt.value = null;
    sessionExited.value = false;
    currentDirectory.value = "/home/guest";
    commandHistory.value = [];
    clearHistory();
    systemNuked.value = false;
  });
}
