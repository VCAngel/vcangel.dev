export type Filesystem = Record<string, DirectoryItem[]>;

export interface DirectoryItem {
  name: string;
  type: "dir" | "file" | "exe";
  hidden?: true;
  ignoredByList?: true;
}

export interface RouteContents {
  route: string;
  items: DirectoryItem[];
}
