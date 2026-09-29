export type User = "guest" | "vcangel" | "root";

export interface UserInfo {
  home: string;
  groups: string[];
}
