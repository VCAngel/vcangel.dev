import { User } from "./user.model.ts";

export type Filesystem = Record<string, DirectoryItem[]>;

export interface DirectoryItem {
  name: string;
  type: "dir" | "file" | "exe";
  ignoredByList?: true;
  owner?: User;
  group?: string;
  mode?: number; // Unix permission bits, e.g. 0o755
  mtime?: number; // Epoch millis
  size?: number; // Fake byte size for binaries without a content entry
}

export interface RouteContents {
  route: string;
  items: DirectoryItem[];
}
