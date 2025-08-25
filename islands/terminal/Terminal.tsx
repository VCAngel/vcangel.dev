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
import { ICommandResponse, INavigatorState } from "../../src/models/command.model.ts";
import { ConsolePromptRefState, NavigatorState } from "../ContextWrapper.tsx";
import {
  addToHistory,
  caretPosition,
  commandHistory,
  commandInput,
  commandOutput,
  displayedHistory,
  selectedHistoryIndex,
} from "../../src/state/app.state.tsx";

export function TerminalPrompt({ urlPathName }: { urlPathName: string }) {
  const navigatorState = useContext(NavigatorState);
  const [consolePromptRef] = useContext(ConsolePromptRefState);

  const textRef = createRef<HTMLParagraphElement>();
  const caretRef = createRef<HTMLDivElement>();

  const isInitialized = useSignal<boolean>(false);
  const setIsInitialized = (val: boolean) => (isInitialized.value = val);

  const commandItems = useSignal<string[]>([]);
  const setCommandItems = (val: string[]) => (commandItems.value = val);

  useEffect(() => {
    if (textRef.current) {
      // Scroll to the end of the pre element
      const scrollWidth = textRef.current.scrollWidth;
      textRef.current.scrollLeft = scrollWidth;
      setCommandItems(commandInput.value.trim().split(/\s+/));
    }
  }, [commandInput.value]);

  useEffect(() => {
    if (caretRef.current) {
      caretRef.current.style.left = `${caretPosition.value}ch`;
    }
  }, [caretPosition.value]);

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
    commandInput.value = e.currentTarget.value;
    caretPosition.value = e.currentTarget.selectionStart || 0;
  };

  const handleOutput = (e: TargetedEvent<HTMLInputElement, KeyboardEvent>) => {
    if (e.key === "Enter") {
      commandOutput.value = commandInput.value;
      handleHistory();
      commandInput.value = "";
      caretPosition.value = 0;
      return;
    }

    caretPosition.value = e.currentTarget.selectionStart || 0;
  };

  const handleHistory = () => {
    if (commandInput.value === "") {
      addToHistory({
        command: "",
        response: () => <></>,
        route: urlPathName,
      });

      return;
    }

    handleCommandComponents(
      commandItems.value,
      commandInput.value,
      urlPathName,
      commandHistory.value,
      navigatorState,
    ).then(addToHistory);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent cursor from moving
      const newIndex =
        selectedHistoryIndex.value > 0 ? selectedHistoryIndex.value - 1 : 0;
      if (selectedHistoryIndex.value > 0 && newIndex >= 0) {
        commandInput.value = commandHistory.value[newIndex].command;
        selectedHistoryIndex.value = newIndex;
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent cursor from moving
      const newIndex =
        selectedHistoryIndex.value < commandHistory.value.length - 1
          ? selectedHistoryIndex.value + 1
          : commandHistory.value.length;
      if (newIndex >= 0 && newIndex < commandHistory.value.length) {
        commandInput.value = commandHistory.value[newIndex].command;
      } else {
        commandInput.value = ""; // Clear input if we've gone past the most recent command
      }
      selectedHistoryIndex.value = newIndex;
    }
  };

  return (
    <>
      <input
        ref={consolePromptRef}
        type="text"
        value={commandInput.value}
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
            {commandInput.value || "\u00a0"}
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
