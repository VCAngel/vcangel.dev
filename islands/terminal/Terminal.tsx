import { ComponentChildren } from "preact";
import { createRef, TargetedEvent } from "preact/compat";
import { useContext, useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import {
  Banner,
  Help,
  WhoAmI,
  WhoIs,
} from "../../src/components/commands/Base.tsx";
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

  const isInitialized = useSignal<boolean>(false);
  const setIsInitialized = (val: boolean) => (isInitialized.value = val);
  const input = useSignal<string>("banner");
  const setInput = (val: string) => (input.value = val);
  const _output = useSignal<string>("");
  const setOutput = (val: string) => (_output.value = val);

  const caretPosition = useSignal<number>(0);
  const setCaretPosition = (val: number) => (caretPosition.value = val);
  const commandItems = useSignal<string[]>([]);
  const setCommandItems = (val: string[]) => (commandItems.value = val);
  const historyIndex = useSignal<number>(history.value.length);
  const setHistoryIndex = (val: number) => {
    historyIndex.value = val;
  };

  useEffect(() => {
    if (textRef.current) {
      // Scroll to the end of the pre element
      const scrollWidth = textRef.current.scrollWidth;
      textRef.current.scrollLeft = scrollWidth;
      setCommandItems(input.value.trim().split(/\s+/));
    }
  }, [input.value]);

  useEffect(() => {
    if (caretRef.current) {
      caretRef.current.style.left = `${caretPosition.value}ch`;
    }
  }, [caretPosition.value]);

  useEffect(() => setHistoryIndex(history.value.length), [history.value]);

  // Run banner on component mount
  useEffect(() => {
    if (!isInitialized.value) setIsInitialized(true);
  }, [isInitialized.value]);

  useEffect(() => {
    if (isInitialized.value && consolePromptRef.current) {
      consolePromptRef.current.dispatchEvent(
        new KeyboardEvent("keyup", { key: "Enter" }),
      );
    }
  }, [isInitialized.value]);

  const handleInput = (e: TargetedEvent<HTMLInputElement, KeyboardEvent>) => {
    setInput(e.currentTarget.value);
    setCaretPosition(e.currentTarget.selectionStart || 0);
  };

  const handleOutput = (e: TargetedEvent<HTMLInputElement, KeyboardEvent>) => {
    if (e.key === "Enter") {
      setOutput(input.value);
      handleHistory();
      setInput("");
      setCaretPosition(0);
      return;
    }

    setCaretPosition(e.currentTarget.selectionStart || 0);
  };

  const handleHistory = () => {
    if (input.value === "") {
      setHistory([...history.value]);
      setDisplayedHistory([
        ...displayedHistory.value,
        {
          command: "",
          response: () => <></>,
          route: urlPathName,
        },
      ]);

      return;
    }

    const isEqualToLastCommand =
      history.value.length > 0 &&
      commandItems.value[0] === history.value[history.value.length - 1].command;

    handleCommandComponents(
      commandItems.value,
      input.value,
      urlPathName,
      history.value,
      navigatorState,
    ).then((output) => {
      setHistory(
        !isEqualToLastCommand ? [...history.value, output] : [...history.value],
      );

      if (output.command === "clear") {
        setDisplayedHistory([]);
        return;
      }

      setDisplayedHistory([...displayedHistory.value, output]);
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent cursor from moving
      const newIndex = historyIndex.value > 0 ? historyIndex.value - 1 : 0;
      if (history.value.length > 0 && newIndex >= 0) {
        setInput(history.value[newIndex].command);
        setHistoryIndex(newIndex);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent cursor from moving
      const newIndex =
        historyIndex.value < history.value.length - 1
          ? historyIndex.value + 1
          : history.value.length;
      if (newIndex >= 0 && newIndex < history.value.length) {
        setInput(history.value[newIndex].command);
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
        value={input.value}
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
      ></label>
      <div
        className="console-pane flex-shrink-0 flex gap-2 items-center justify-start"
        onClick={() => consolePromptRef?.current?.focus()}
      >
        <pre className="shrink-0">
          <span className="text-[#C541F2] selection:bg-[#C541F2]">
            guest@vcangel.dev
          </span>{" "}
          in{" "}
          <span className="text-[#41F2A9] selection:bg-[#41F2A9]">
            {urlPathName.replace("/home/guest", "~")}
          </span>{" "}
          <span className="text-[#F2BB41] selection:bg-[#F2BB41]">λ</span>
        </pre>
        <p
          ref={textRef}
          className="block-caret bg-transparent m-0 p-0 w-full overflow-x-auto whitespace-nowrap max-w-full hide-scrollbar"
        >
          <span class="inline-block relative whitespace-pre">
            {input.value || "\u00a0"}
            <div ref={caretRef} class="absolute top-0">
              &nbsp;
            </div>
          </span>
        </p>
      </div>
    </>
  );
}

export function Terminal({
  children,
  className,
}: {
  children: ComponentChildren;
  className: string;
}) {
  const terminalRef = createRef<HTMLInputElement>();
  const [terminalPromptRef] = useContext(ConsolePromptRefState);
  const { displayedHistory } = useContext(ConsoleState);

  useEffect(() => {
    terminalPromptRef?.current?.focus();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 40);
  }, [displayedHistory.value]);

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
    case "banner":
      return Banner(commandData);
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
