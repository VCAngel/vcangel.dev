import { createRef, TargetedEvent } from "preact/compat";
import { Ref, StateUpdater, useEffect, useState } from "preact/hooks";
import {
    Cat,
    Cd,
    Echo,
    Help,
    List,
    Mkdir,
    Pwd,
    Rm,
    Whoami,
    Whois,
} from "../src/components/Commands.tsx";
import { ICommandResponse } from "../src/models/Command.ts";
import History from "./History.tsx";

interface ITerminalPrompt {
    inputRef: Ref<HTMLInputElement>;
    history: ICommandResponse[];
    setHistory: StateUpdater<ICommandResponse[]>;
    displayedHistory: ICommandResponse[];
    setDisplayedHistory: StateUpdater<ICommandResponse[]>;
}

export function TerminalPrompt(
    { inputRef, history, setHistory, displayedHistory, setDisplayedHistory }:
        ITerminalPrompt,
) {
    const textRef = createRef<HTMLPreElement>();
    const [input, setInput] = useState("");
    const [_output, setOutput] = useState("");

    useEffect(() => {
        if (textRef.current) {
            // Scroll to the end of the pre element
            const scrollWidth = textRef.current.scrollWidth;
            textRef.current.scrollLeft = scrollWidth;
        }
    }, [input]);

    const handleOutput = (
        e: TargetedEvent<HTMLInputElement, KeyboardEvent>,
    ) => {
        if (e.key === "Enter") {
            setOutput(input);
            handleHistory();
            setInput("");
            return;
        }
    };

    //-> Handle the command history
    // If the input is empty, add an empty command to the displayed history
    const handleHistory = () => {
        if (input === "") {
            setDisplayedHistory([...displayedHistory, {
                command: "",
                response: () => <></>,
            }]);
            return;
        }

        // If the input is the same as the last command, don't add it to the history
        const isEqualToLastCommand = history.length > 0 &&
            input.trim() === history[history.length - 1].command;
        const output: ICommandResponse = handleCommandComponents(input.trim());

        // If the command is 'clear', clear the displayed history
        if (output.command === "clear") {
            setDisplayedHistory([]);
            return;
        }

        if (!isEqualToLastCommand) setHistory([...history, output]);
        setDisplayedHistory([...displayedHistory, output]);
    };

    return (
        <>
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                onKeyDown={(e) => handleOutput(e)}
                className="absolute -top-[1000px] opacity-0"
                name="terminalInput"
            />
            <label
                htmlFor="terminalInput"
                className="absolute -top-[1000px] opacity-0"
            >
            </label>
            <div
                className="flex-shrink-0 flex gap-2 items-center justify-start max-w-full overflow-hidden"
                onClick={() => inputRef.current?.focus()}
            >
                <p className="shrink-0">
                    <span className="text-[#C541F2]">guest</span> in{" "}
                    <span className="text-[#41F2A9]">~</span>{" "}
                    <span className="text-[#F2BB41]">λ</span>
                </p>
                <pre
                    ref={textRef}
                    className="block-caret bg-transparent m-0 p-0 w-full overflow-x-auto whitespace-nowrap max-w-full hide-scrollbar"
                >
                    {input}
                    <span>&nbsp;</span>
                </pre>
            </div>
        </>
    );
}

// Terminal prompt wrapper
export function Terminal() {
    const terminalPromptRef = createRef<HTMLInputElement>();
    const terminalRef = createRef<HTMLDivElement>();
    const [history, setHistory] = useState<ICommandResponse[]>([]); // Command history
    const [displayedHistory, setDisplayedHistory] = useState<
        ICommandResponse[]
    >([]); // Displayed command history - Includes empty commands

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
        <div
            ref={terminalRef}
            className="flex flex-col flex-grow p-4 pb-6 max-h-full overflow-y-auto hide-scrollbar"
            onClick={() => terminalPromptRef.current?.focus()}
        >
            <History items={displayedHistory} />
            <TerminalPrompt
                inputRef={terminalPromptRef}
                history={history}
                setHistory={setHistory}
                displayedHistory={displayedHistory}
                setDisplayedHistory={setDisplayedHistory}
            />
        </div>
    );
}

function handleCommandComponents(input: string): ICommandResponse {
    //TODO Assign all commands cases
    switch (input) {
        case "help":
        case "?":
            return Help({ command: input });
        case "clear":
            return { command: input, response: () => null };
        case "ls":
            return List({ command: input });
        case "pwd":
            return Pwd({ command: input });
        case "whoami":
            return Whoami({ command: input });
        case "whois":
            return Whois({ command: input });
        case "cd":
            return Cd({ command: input });
        case "mkdir":
            return Mkdir({ command: input });
        case "rm":
            return Rm({ command: input });
        case "cat":
            return Cat({ command: input });
        case "echo":
            return Echo({ command: input });
        default:
            return {
                command: input,
                response: () => (
                    <p>
                        Command not found. For a list of all commands, type{" "}
                        <span>'help'</span>.
                    </p>
                ),
            };
    }
}
