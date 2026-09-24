import { computed, signal } from "@preact/signals";

import { CommandResponse } from "../models/command.model.ts";
import { User } from "../models/user.model.ts";

export const currentUser = signal<User>("guest");

// Shells "below" the current one: `su` pushes, `exit` pops back to the
// previous user and the directory it was in
export interface ShellFrame {
  user: User;
  cwd: string;
}
export const userStack = signal<ShellFrame[]>([]);

// Masked interactive prompt (e.g. `su` password), rendered by SecretPrompt
export interface PendingPrompt {
  label: string;
  onSubmit: (value: string) => CommandResponse;
}
export const pendingPrompt = signal<PendingPrompt | null>(null);

export const sessionExited = signal<boolean>(false);

// The regular prompt hides while something else owns the terminal
export const promptLocked = computed(() =>
  pendingPrompt.value !== null || sessionExited.value
);

// `sudo` elevates the effective user for a single command
let sudoOverride: User | null = null;

export function effectiveUser(): User {
  return sudoOverride ?? currentUser.value;
}

export function runAsRoot<T>(fn: () => T): T {
  const previous = sudoOverride;
  sudoOverride = "root";
  try {
    return fn();
  } finally {
    sudoOverride = previous;
  }
}

export function switchUser(user: User, cwd: string) {
  userStack.value = [...userStack.value, { user: currentUser.value, cwd }];
  currentUser.value = user;
}

// Returns the shell to go back to, or null when there's none left.
// After a reload the stack is empty, so non-guests fall back to guest.
export function logoutUser(): ShellFrame | null {
  const stack = userStack.value;
  if (currentUser.value === "guest" && !stack.length) return null;
  const previous = stack.at(-1) ?? { user: "guest", cwd: "/home/guest" };
  currentUser.value = previous.user;
  userStack.value = stack.slice(0, -1);
  return previous;
}
