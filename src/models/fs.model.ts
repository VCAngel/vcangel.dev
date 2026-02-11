export type Filesystem = Record<string, IDirectoryItem[]>;

export interface IDirectoryItem {
  name: string;
  type: "dir" | "file" | "exe";
  hidden?: true;
  ignoredByList?: true;
}

export interface IRouteContents {
  route: string;
  items: IDirectoryItem[];
}
