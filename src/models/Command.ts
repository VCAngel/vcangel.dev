import { JSX } from "preact/jsx-runtime";

export type ISetConsoleState = (state: IConsoleState) => void;

export interface IConsoleState {
    history: ICommandResponse[];
    displayedHistory: ICommandResponse[];
}

export interface ICommandResponse {
    route: string;
    command: string;
    response: () => JSX.Element | null;
}
