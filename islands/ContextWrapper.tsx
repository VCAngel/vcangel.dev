import { ComponentChildren, createContext, createRef } from "preact";
import { useMemo } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";
import {
  IConsolePromptRefState,
  INavigatorState,
  RouteToNavigate,
} from "../src/models/command.model.ts";

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
      <ConsolePromptRefState.Provider value={createConsolePromptRefState()}>
        {children}
      </ConsolePromptRefState.Provider>
    </NavigatorState.Provider>
  );
}
