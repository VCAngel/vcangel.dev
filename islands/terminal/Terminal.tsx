import { ComponentChildren } from "preact";
import { createRef, TargetedEvent } from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";
import { Help, WhoAmI, WhoIs } from "../../src/components/commands/Base.tsx";
import { Cat } from "../../src/components/commands/gnu-linux/Cat.tsx";
import { Cd } from "../../src/components/commands/gnu-linux/Cd.tsx";
import { Echo } from "../../src/components/commands/gnu-linux/Echo.tsx";
import { List } from "../../src/components/commands/gnu-linux/List.tsx";
import { Pwd } from "../../src/components/commands/gnu-linux/Pwd.tsx";
import { History as CmdHistory } from "../../src/components/commands/gnu-linux/History.tsx";
import { ICommandResponse, INavigatorState } from "../../src/models/Command.ts";
import {
  ConsolePromptRefState,
  ConsoleState,
  NavigatorState,
} from "../ContextWrapper.tsx";

export function TerminalPrompt({ urlPathName }: { urlPathName: string }) {
  const { history, setHistory, displayedHistory, setDisplayedHistory } =
    useContext(ConsoleState);
  const navigatorState = useContext(NavigatorState);
  const [consolePromptRef] = useContext(ConsolePromptRefState);

  const textRef = createRef<HTMLParagraphElement>();
  const caretRef = createRef<HTMLDivElement>();

  const [input, setInput] = useState("");
  const [_output, setOutput] = useState("");
  const [caretPosition, setCaretPosition] = useState(0);
  const [commandItems, setCommandItems] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(history.length);

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

  useEffect(() => setHistoryIndex(history.length), [history]);

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

    const isEqualToLastCommand = history.length > 0 &&
      commandItems[0] === history[history.length - 1].command;

    handleCommandComponents(
      commandItems,
      input,
      urlPathName,
      history,
      navigatorState,
    )
      .then(
        (output) => {
          setHistory(
            !isEqualToLastCommand ? [...history, output] : [...history],
          );

          if (output.command === "clear") {
            setDisplayedHistory([]);
            return;
          }

          setDisplayedHistory([...displayedHistory, output]);
        },
      );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setCaretPosition(e.currentTarget?.selectionStart || 0);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent cursor from moving
      const newIndex = historyIndex > 0 ? historyIndex - 1 : 0;
      if (history.length > 0 && newIndex >= 0) {
        setInput(history[newIndex].command);
        setHistoryIndex(newIndex);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent cursor from moving
      const newIndex = historyIndex < history.length - 1
        ? historyIndex + 1
        : history.length;
      if (newIndex >= 0 && newIndex < history.length) {
        setInput(history[newIndex].command);
      } else {
        setInput(""); // Clear input if we've gone past the most recent command
      }
      setHistoryIndex(newIndex);
    }
  };

  return (
    <>
      <input
        ref={consolePromptRef}
        type="text"
        value={input}
        onChange={handleInput}
        onKeyUp={handleOutput}
        onKeyDown={handleKeyDown}
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
        className="console-pane flex-shrink-0 flex gap-2 items-center justify-start"
        onClick={() => consolePromptRef.current?.focus()}
      >
        <pre className="shrink-0">
          <span className="text-[#C541F2] selection:bg-[#C541F2]">guest@vcangel.dev</span> in{" "}
          <span className="text-[#41F2A9] selection:bg-[#41F2A9]">{urlPathName.replace('/home/guest', '~')}</span>{" "}
          <span className="text-[#F2BB41] selection:bg-[#F2BB41]">λ</span>
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

export function Terminal(
  { children, className }: { children: ComponentChildren; className: string },
) {
  const terminalRef = createRef<HTMLInputElement>();
  const [terminalPromptRef] = useContext(ConsolePromptRefState);
  const { displayedHistory } = useContext(ConsoleState);

  useEffect(() => {
    terminalPromptRef.current?.focus();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 40);
  }, [displayedHistory]);

  return (
    <main
      ref={terminalRef}
      className={className}
      onClick={() => terminalPromptRef.current?.focus()}
    >
      {children}
    </main>
  );
}

async function handleCommandComponents(
  commandItems: string[],
  fullCommand: string,
  route: string,
  history: ICommandResponse[],
  navigatorState: INavigatorState,
): Promise<ICommandResponse> {
  const commandData: { command: string; route: string } = {
    command: commandItems[0],
    route,
  };

  switch (commandData.command) {
    case "help":
    case "?":
      return Help(commandData);
    case "cat":
      return Cat(commandData);
    case "cd":
      return await Cd(
        { command: commandItems.join(" "), route },
        commandItems.slice(1),
        navigatorState,
      );
    case "clear":
      return { ...commandData, response: () => null, route: "" };
    case "echo":
      return Echo({
        command: fullCommand,
        route,
      });
    case "history":
      return CmdHistory(commandData, history);
    case "ls":
      return List(
        { command: commandItems.join(" "), route },
        commandItems.slice(1),
      );
    case "pwd":
      return Pwd(commandData);
    case "whoami":
      return WhoAmI(commandData);
    case "whois":
      return WhoIs(commandData);
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
