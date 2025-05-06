import { RefObject } from "preact";
import { Signal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";

//-> Contexts
export interface IConsoleState {
  history: Signal<ICommandResponse[]>;
  setHistory: (val: ICommandResponse[]) => void;

  displayedHistory: Signal<ICommandResponse[]>;
  setDisplayedHistory: (val: ICommandResponse[]) => void;
}

export interface INavigatorState {
  routeToNavigate: Signal<RouteToNavigate>;
  setRouteToNavigate: (val: RouteToNavigate) => void;
}

export interface RouteToNavigate {
  route: string;
  activatedWithCd: boolean;
}

export type IConsolePromptRefState = [
  RefObject<HTMLInputElement>,
  (el: HTMLInputElement) => void,
];

//-> Console commands

export interface ICommandResponse {
  route: string;
  command: string;
  response: () => JSX.Element | null;
}

export interface IDirectoryItem {
  name: string;
  type: "dir" | "file" | "exe";
  hidden?: true;
  ignoredByList?: true;
}

//-> Routing
export interface IRouteContents {
  route: string;
  items: IDirectoryItem[];
}
