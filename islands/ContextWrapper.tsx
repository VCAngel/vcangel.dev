import { Signal, useSignal } from "@preact/signals";
import { ComponentChildren, createContext, createRef } from "preact";
import { useMemo } from "preact/hooks";
import {
  ConsolePromptRefState,
  NavigatorState,
  RouteToNavigate,
} from "../src/models/command.model.ts";

function createNavigatorState(): NavigatorState {
  const routeToNavigate = useSignal({
    route: "",
    activatedWithCd: false,
  });
  const setRouteToNavigate = (newRoute: RouteToNavigate) =>
    (routeToNavigate.value = newRoute);

  const navState: NavigatorState = useMemo(
    () => ({
      routeToNavigate,
      setRouteToNavigate,
    }),
    [routeToNavigate.value],
  );

  return navState;
}

function createConsolePromptRefState(): ConsolePromptRefState {
  const ref = createRef<HTMLInputElement>();

  const setRef = (newRef: HTMLInputElement) => {
    ref.current = newRef;
  };

  return [ref, setRef];
}

export const NavigatorStateCtx = createContext<NavigatorState>({
  routeToNavigate: new Signal({ route: "", activatedWithCd: false }),
  setRouteToNavigate: () => {},
});

export const ConsolePromptRefStateCtx = createContext<ConsolePromptRefState>([
  createRef<HTMLInputElement>(),
  () => {},
]);

export default function ContextWrapper({
  children,
}: {
  children: ComponentChildren;
}) {
  return (
    <NavigatorStateCtx.Provider value={createNavigatorState()}>
      <ConsolePromptRefStateCtx.Provider value={createConsolePromptRefState()}>
        {children}
      </ConsolePromptRefStateCtx.Provider>
    </NavigatorStateCtx.Provider>
  );
}
