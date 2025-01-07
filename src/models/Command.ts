import { RefObject } from "preact";
import { Dispatch, StateUpdater } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

//-> Contexts
export interface IConsoleState {
  history: ICommandResponse[];
  setHistory: Dispatch<StateUpdater<ICommandResponse[]>>;

  displayedHistory: ICommandResponse[];
  setDisplayedHistory: Dispatch<StateUpdater<ICommandResponse[]>>;
}

export interface INavigatorState {
  routeToNavigate: { route: string; activatedWithCd: boolean };
  setRouteToNavigate: Dispatch<
    StateUpdater<{ route: string; activatedWithCd: boolean }>
  >;
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
