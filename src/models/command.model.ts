import { RefObject } from "preact";
import { Signal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";

//-> Contexts
export interface NavigatorState {
  routeToNavigate: Signal<RouteToNavigate>;
  setRouteToNavigate: (val: RouteToNavigate) => void;
}

export interface RouteToNavigate {
  route: string;
  activatedWithCd: boolean;
}

export type ConsolePromptRefState = [
  RefObject<HTMLInputElement>,
  (el: HTMLInputElement) => void,
];

//-> Console commands

export interface CommandResponse {
  route: string;
  command: string;
  response: () => JSX.Element | null;
}
