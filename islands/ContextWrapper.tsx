import { Signal, signal } from "@preact/signals";
import { ComponentChildren, createContext, createRef } from "preact";
import { useMemo, useState } from "preact/hooks";
import {
    IConsolePromptRefState,
    IConsoleState,
    INavigatorState,
} from "../src/models/Command.ts";

function createNavigatorState(): INavigatorState {
    const [routeToNavigate, setRouteToNavigate] = useState("/");

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

function createConsoleState(): Signal<IConsoleState> {
    const state = signal({
        history: [],
        displayedHistory: [],
    });

    return state;
}

export const ConsoleState = createContext<Signal<IConsoleState>>(signal({
    history: [],
    displayedHistory: [],
}));

export const NavigatorState = createContext<INavigatorState>({
    routeToNavigate: "",
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
