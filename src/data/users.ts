import { User, UserInfo } from "../models/user.model.ts";

export const USERS: Record<User, UserInfo> = {
  guest: { home: "/home/guest", groups: ["guest", "visitors"] },
  vcangel: {
    home: "/home/vcangel",
    groups: ["vcangel", "wheel", "sudo", "phrogs"],
  },
  root: { home: "/root", groups: ["root"] },
};

// Users shown by `users` (root never "logs in" here)
export const LOGIN_USERS: User[] = ["guest", "vcangel"];

// Groups allowed to run `sudo`
export const SUDO_GROUPS = ["sudo", "wheel", "root"];

// NOTE: Client-side easter egg, anyone reading the bundle can find it
export const SU_PASSPHRASE = "[PLACEHOLDER]";

export const SU_WELCOME = "[PLACEHOLDER] Welcome back, boss (⌐■_■)";

// `sudo <key>` → canned reply instead of running a command
export const SUDO_EGGS: Record<string, string> = {
  "make me a sandwich": "Okay. 🥪",
  "[PLACEHOLDER]": "[PLACEHOLDER]",
};

export function isUser(name: string): name is User {
  return Object.hasOwn(USERS, name);
}
