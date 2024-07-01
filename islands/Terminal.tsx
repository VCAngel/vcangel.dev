import { createRef, TargetedEvent } from "preact/compat";
import { Ref, StateUpdater, useEffect, useState } from "preact/hooks";
import History from "./History.tsx";

export function TerminalPrompt(
    { inputRef, history, setHistory }: {
        inputRef: Ref<HTMLInputElement>;
        history: unknown[];
        setHistory: StateUpdater<unknown[]>;
    },
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

    //TODO Assign custom response components
    const handleHistory = () => {
        setHistory([...history, input]);
    };

    return (
        <>
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                onKeyDown={(e) => handleOutput(e)}
                className="absolute -top-[9999] opacity-0"
            />
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
    const [history, setHistory] = useState<unknown[]>([]); // TODO Create component/model for history

    // Focus the input on load
    useEffect(() => {
        terminalPromptRef.current?.focus();
    }, []);

    // Focus terminal prompt input
    useEffect(() => {
        if (terminalRef.current) {
            // Scroll to the end of the container
            const scrollHeight = terminalRef.current.scrollHeight;
            terminalRef.current.scrollTop = scrollHeight;
        }
    }, [history]);

    return (
        <div
            ref={terminalRef}
            className="flex flex-col flex-grow p-4 max-h-full overflow-y-auto hide-scrollbar"
            onClick={() => terminalPromptRef.current?.focus()}
        >
            <History items={history} />
            <TerminalPrompt
                inputRef={terminalPromptRef}
                history={history}
                setHistory={setHistory}
            />
        </div>
    );
}
