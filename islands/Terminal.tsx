import { ComponentChildren } from "preact";
import { createRef, TargetedEvent } from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";
import {
    Cat,
    Cd,
    Echo,
    Help,
    List,
    Pwd,
    Rm,
    Whoami,
    Whois,
} from "../src/components/Commands.tsx";
import { ICommandResponse, INavigatorState } from "../src/models/Command.ts";
import {
    ConsolePromptRefState,
    ConsoleState,
    NavigatorState,
} from "./ContextWrapper.tsx";

export function TerminalPrompt({ urlPathName }: { urlPathName: string }) {
    const { history, setHistory, displayedHistory, setDisplayedHistory } =
        useContext(ConsoleState);
    const navigatorState = useContext(NavigatorState);

    const [consolePromptRef] = useContext(
        ConsolePromptRefState,
    );
    const textRef = createRef<HTMLParagraphElement>();
    const caretRef = createRef<HTMLDivElement>();
    const [input, setInput] = useState("");
    const [_output, setOutput] = useState("");
    const [caretPosition, setCaretPosition] = useState(0);
    const [commandItems, setCommandItems] = useState<string[]>([]);

    useEffect(() => {
        if (textRef.current) {
            // Scroll to the end of the pre element
            const scrollWidth = textRef.current.scrollWidth;
            textRef.current.scrollLeft = scrollWidth;
            setCommandItems(input.trim().split(/\s+/));
        }
    }, [input]);

    useEffect(() => {
        if (caretRef.current) {
            caretRef.current.style.left = `${caretPosition}ch`;
        }
    }, [caretPosition]);

    const handleInput = (e: TargetedEvent<HTMLInputElement, KeyboardEvent>) => {
        setInput(e.currentTarget.value);
        setCaretPosition(e.currentTarget.selectionStart || 0);
    };

    const handleOutput = (
        e: TargetedEvent<HTMLInputElement, KeyboardEvent>,
    ) => {
        if (e.key === "Enter") {
            setOutput(input);
            handleHistory();
            setInput("");
            setCaretPosition(0);
            return;
        }

        setCaretPosition(e.currentTarget.selectionStart || 0);
    };

    //-> Handle the command history
    // If the input is empty, add an empty command to the displayed history
    const handleHistory = () => {
        if (input === "") {
            setHistory([...history]);
            setDisplayedHistory([
                ...displayedHistory,
                {
                    command: "",
                    response: () => <></>,
                    route: urlPathName,
                },
            ]);

            return;
        }

        // If the input is the same as the last command, don't add it to the history
        const isEqualToLastCommand = history.length > 0 &&
            commandItems[0] === history[history.length - 1].command;
        const output: ICommandResponse = handleCommandComponents(
            commandItems,
            urlPathName,
            navigatorState,
        );

        // If the command is 'clear', clear the displayed history
        if (output.command === "clear") {
            setHistory([...history]);
            setDisplayedHistory([]);
            return;
        }

        setHistory(!isEqualToLastCommand ? [...history, output] : [...history]);
        setDisplayedHistory([...displayedHistory, output]);
    };

    return (
        <>
            <input
                ref={consolePromptRef}
                type="text"
                value={input}
                onChange={handleInput}
                onKeyUp={handleOutput}
                onKeyDown={(e) =>
                    setCaretPosition(e.currentTarget.selectionStart || 0)}
                className="absolute -top-[1000px] opacity-0"
                id="terminalInput"
                name="terminalInput"
            />
            <label
                htmlFor="terminalInput"
                className="absolute -top-[1000px] opacity-0"
            >
            </label>
            <div
                className="flex-shrink-0 flex gap-2 items-center justify-start max-w-full overflow-hidden p-[2ch] py-[1ch]"
                onClick={() => consolePromptRef.current?.focus()}
            >
                <pre className="shrink-0">
          <span className="text-[#C541F2]">guest@vcangel.dev</span> in{" "}
          <span className="text-[#41F2A9]">{urlPathName}</span>{" "}
          <span className="text-[#F2BB41]">λ</span>
                </pre>
                <p
                    ref={textRef}
                    className="block-caret bg-transparent m-0 p-0 w-full overflow-x-auto whitespace-nowrap max-w-full hide-scrollbar"
                >
                    <span class="inline-block relative whitespace-pre">
                        {input || "\u00a0"}
                        <div ref={caretRef} class="absolute top-0">
                            &nbsp;
                        </div>
                    </span>
                </p>
            </div>
        </>
    );
}

export function Terminal({ children }: { children: ComponentChildren }) {
    const terminalRef = createRef<HTMLInputElement>();
    const [terminalPromptRef] = useContext(
        ConsolePromptRefState,
    );
    const { displayedHistory } = useContext(ConsoleState);

    // Focus the input on load
    useEffect(() => {
        terminalPromptRef.current?.focus();
    }, []);

    // Focus terminal prompt input
    useEffect(() => {
        setTimeout(() => {
            if (terminalRef.current) {
                // Scroll to the end of the container
                const scrollHeight = terminalRef.current.scrollHeight;
                terminalRef.current.scrollTop = scrollHeight;
            }
        }, 40);
    }, [displayedHistory]);

    return (
        <main
            ref={terminalRef}
            className="z-10 bg-[#000000bb] border rounded-sm border-slate-300 flex flex-col flex-grow m-4 mb-6 max-h-full overflow-y-auto hide-scrollbar"
            onClick={() => terminalPromptRef.current?.focus()}
        >
            {children}
        </main>
    );
}

function handleCommandComponents(
    commandItems: string[],
    route: string,
    navigatorState: INavigatorState,
): ICommandResponse {
    //TODO Assign all commands cases
    const commandData: { command: string; route: string } = {
        command: commandItems[0],
        route,
    };

    switch (commandData.command) {
        case "help":
        case "?":
            return Help(commandData);
        case "clear":
            return { ...commandData, response: () => null, route: "" };
        case "cd":
            return Cd(commandData, commandItems.slice(1), navigatorState);
        case "ls":
            return List(commandData);
        case "pwd":
            return Pwd(commandData);
        case "whoami":
            return Whoami(commandData);
        case "whois":
            return Whois(commandData);
        case "rm":
            return Rm(commandData);
        case "cat":
            return Cat(commandData);
        case "echo":
            return Echo(commandData);
        default:
            return {
                command: commandData.command,
                response: () => (
                    <p>
                        Command not found. For a list of all commands, type{" "}
                        <span>'help'</span>.
                    </p>
                ),
                route: commandData.route,
            };
    }
}
