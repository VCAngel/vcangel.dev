import { ComponentChildren, createContext, createRef } from "preact";
import { useMemo, useState } from "preact/hooks";
import {
  ICommandResponse,
  IConsolePromptRefState,
  IConsoleState,
  INavigatorState,
} from "../src/models/Command.ts";

function createNavigatorState(): INavigatorState {
  const [routeToNavigate, setRouteToNavigate] = useState({
    route: "",
    activatedWithCd: false,
  });

  const navState = useMemo(() => ({
    routeToNavigate,
    setRouteToNavigate,
  }), [routeToNavigate]);

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
  const [history, setHistory] = useState<ICommandResponse[]>([]);
  const [displayedHistory, setDisplayedHistory] = useState<
    ICommandResponse[]
  >([]);

  const state = useMemo(() => ({
    history,
    setHistory,
    displayedHistory,
    setDisplayedHistory,
  }), [history, displayedHistory]);

  return state;
}

export const ConsoleState = createContext<IConsoleState>({
  history: [],
  setHistory: () => {},
  displayedHistory: [],
  setDisplayedHistory: () => {},
});

export const NavigatorState = createContext<INavigatorState>({
  routeToNavigate: { route: "", activatedWithCd: false },
  setRouteToNavigate: () => {},
});

export const ConsolePromptRefState = createContext<IConsolePromptRefState>([
  createRef<HTMLInputElement>(),
  () => {},
]);

export default function ContextWrapper(
  { children }: { children: ComponentChildren },
) {
  return (
    <NavigatorState.Provider value={createNavigatorState()}>
      <ConsoleState.Provider value={createConsoleState()}>
        <ConsolePromptRefState.Provider
          value={createConsolePromptRefState()}
        >
          {children}
        </ConsolePromptRefState.Provider>
      </ConsoleState.Provider>
    </NavigatorState.Provider>
  );
}
