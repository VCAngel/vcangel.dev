import { ComponentChildren, createContext, createRef } from "preact";
import { useMemo } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";
import {
  ICommandResponse,
  IConsolePromptRefState,
  IConsoleState,
  INavigatorState,
  RouteToNavigate,
} from "../src/models/Command.ts";

function createNavigatorState(): INavigatorState {
  const routeToNavigate = useSignal({
    route: "",
    activatedWithCd: false,
  });
  const setRouteToNavigate = (newRoute: RouteToNavigate) =>
    (routeToNavigate.value = newRoute);

  const navState: INavigatorState = useMemo(
    () => ({
      routeToNavigate,
      setRouteToNavigate,
    }),
    [routeToNavigate.value],
  );

  return navState;
}

function createConsolePromptRefState(): IConsolePromptRefState {
  const ref = createRef<HTMLInputElement>();

  const setRef = (newRef: HTMLInputElement) => {
    ref.current = newRef;
  };

  return [ref, setRef];
}

function createConsoleState(): IConsoleState {
  const history = useSignal<ICommandResponse[]>([]);
  const setHistory = (newHistory: ICommandResponse[]) =>
    (history.value = newHistory);

  const displayedHistory = useSignal<ICommandResponse[]>([]);
  const setDisplayedHistory = (newHistory: ICommandResponse[]) =>
    (displayedHistory.value = newHistory);

  const state: IConsoleState = useMemo(
    () => ({
      history,
      setHistory,
      displayedHistory,
      setDisplayedHistory,
    }),
    [history.value, displayedHistory.value],
  );

  return state;
}

export const ConsoleState = createContext<IConsoleState>({
  history: new Signal([]),
  setHistory: () => [],
  displayedHistory: new Signal([]),
  setDisplayedHistory: () => [],
});

export const NavigatorState = createContext<INavigatorState>({
  routeToNavigate: new Signal({ route: "", activatedWithCd: false }),
  setRouteToNavigate: () => {},
});

export const ConsolePromptRefState = createContext<IConsolePromptRefState>([
  createRef<HTMLInputElement>(),
  () => {},
]);

export default function ContextWrapper({
  children,
}: {
  children: ComponentChildren;
}) {
  return (
    <NavigatorState.Provider value={createNavigatorState()}>
      <ConsoleState.Provider value={createConsoleState()}>
        <ConsolePromptRefState.Provider value={createConsolePromptRefState()}>
          {children}
        </ConsolePromptRefState.Provider>
      </ConsoleState.Provider>
    </NavigatorState.Provider>
  );
}
