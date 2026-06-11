import { ComponentChildren } from "preact";
import { createRef, TargetedEvent } from "preact/compat";
import { useEffect, useState } from "preact/hooks";

import { executeCommand } from "../../src/commands/registry.tsx";
import {
  addToHistory,
  caretPosition,
  commandHistory,
  commandInput,
  currentDirectory,
  displayedHistory,
  focusTerminal,
  selectedHistoryIndex,
  terminalInputRef,
} from "../../src/state/app.state.ts";

export function TerminalPrompt() {
  const textRef = createRef<HTMLParagraphElement>();
  const caretRef = createRef<HTMLDivElement>();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      // Scroll to the end of the pre element
      const scrollWidth = textRef.current.scrollWidth;
      textRef.current.scrollLeft = scrollWidth;
    }
  }, [commandInput.value]);

  useEffect(() => {
    if (caretRef.current) {
      caretRef.current.style.left = `${caretPosition.value}ch`;
    }
  }, [caretPosition.value]);

  // Run banner on component mount
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      const result = executeCommand("banner", currentDirectory.value);
      addToHistory(result);
    }
  }, [isInitialized]);

  useEffect(() => {
    // Focus the input when component mounts
    focusTerminal();
  }, []);

  const handleInput = (e: TargetedEvent<HTMLInputElement, KeyboardEvent>) => {
    commandInput.value = e.currentTarget.value;
    caretPosition.value = e.currentTarget.selectionStart || 0;
  };

  const handleOutput = (e: TargetedEvent<HTMLInputElement, KeyboardEvent>) => {
    if (e.key === "Enter") {
      // Use the current URL path as the command route and command registry to execute the command
      const result = executeCommand(commandInput.value, currentDirectory.value);
      addToHistory(result);
      commandInput.value = "";
      caretPosition.value = 0;
      return;
    }

    caretPosition.value = e.currentTarget.selectionStart || 0;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent cursor from moving
      if (commandHistory.value.length === 0) return;

      const newIndex = Math.max(0, selectedHistoryIndex.value - 1);
      if (newIndex < commandHistory.value.length) {
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
        ref={(el) => {
          if (el) terminalInputRef.value = el;
        }}
        type="text"
        value={commandInput.value}
        onChange={handleInput}
        onKeyUp={handleOutput}
        onKeyDown={handleKeyDown}
        className="absolute top-[-1000px] opacity-0"
        id="terminalInput"
        name="terminalInput"
      />
      <label
        htmlFor="terminalInput"
        className="absolute top-[-1000px] opacity-0"
      >
      </label>
      <div
        className="console-pane shrink-0 flex gap-2 items-center justify-start"
        onClick={focusTerminal}
      >
        <pre className="shrink-0">
          <span className="text-[#C541F2] selection:bg-[#C541F2]">
            guest@vcangel.dev
          </span>{" "}
          in{" "}
          <span className="text-[#41F2A9] selection:bg-[#41F2A9]">
            {currentDirectory.value.replace("/home/guest", "~")}
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
  const terminalRef = createRef<HTMLElement>();

  useEffect(() => {
    focusTerminal();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 40);
  }, [displayedHistory.value]);

  return (
    <main ref={terminalRef} className={className} onClick={focusTerminal}>
      {children}
    </main>
  );
}
