import { JSX } from "preact/jsx-runtime";

export interface ICommandResponse {
    command: string;
    response: () => JSX.Element | null;
}
