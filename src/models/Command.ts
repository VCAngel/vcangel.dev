import { Ref } from "preact";
import { StateUpdater } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

//-> Contexts
export interface IConsoleState {
    history: ICommandResponse[];
    setHistory: StateUpdater<ICommandResponse[]>;

    displayedHistory: ICommandResponse[];
    setDisplayedHistory: StateUpdater<ICommandResponse[]>;
}

export interface INavigatorState {
    routeToNavigate: { route: string; activatedWithCd: boolean };
    setRouteToNavigate: StateUpdater<
        { route: string; activatedWithCd: boolean }
    >;
}

export type IConsolePromptRefState = [
    Ref<HTMLInputElement>,
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
}
