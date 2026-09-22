import { signal } from "@preact/signals";

import { User } from "../models/user.model.ts";

export const currentUser = signal<User>("guest");

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
