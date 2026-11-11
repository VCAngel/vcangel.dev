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
  media?: Media; // Real image behind a binary entry, shown by `open`
}

export interface Media {
  src: string; // Served path, e.g. "/img/phrog.gif" (asset() applied on use)
  alt?: string;
}

// A named image, as listed in a directory or shown in the image viewer
export interface MediaFile extends Media {
  name: string;
}

export interface RouteContents {
  route: string;
  items: DirectoryItem[];
}
