import { User, UserInfo } from "../models/user.model.ts";

export const USERS: Record<User, UserInfo> = {
  guest: { home: "/home/guest", groups: ["guest", "visitors"] },
  vcangel: {
    home: "/home/vcangel",
    groups: ["vcangel", "wheel", "sudo", "phrogs"],
  },
  root: { home: "/root", groups: ["root"] },
};

export function isUser(name: string): name is User {
  return Object.hasOwn(USERS, name);
}
