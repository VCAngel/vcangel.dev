import { ComponentChildren } from "preact";
import { createRef, TargetedEvent } from "preact/compat";
import { useEffect, useState } from "preact/hooks";

import { executeCommand } from "../../src/commands/registry.tsx";
import { tabComplete } from "../../src/commands/utils/complete.ts";
import { CompletionList } from "../../src/components/CompletionList.tsx";
import { PromptLabel } from "../../src/components/PromptLabel.tsx";
import { currentUser, promptLocked } from "../../src/state/session.state.ts";
import {
  addToHistory,
  caretPosition,
  commandHistory,
  commandInput,
  completionMenu,
  currentDirectory,
  displayedHistory,
  focusTerminal,
  selectedHistoryIndex,
  setCommandLine,
  terminalInputRef,
} from "../../src/state/app.state.ts";

const MODIFIER_KEYS = ["Shift", "Control", "Alt", "Meta", "CapsLock"];

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
    completionMenu.value = null; // Edits without a keydown (context-menu paste)
  };

  const handleOutput = (e: TargetedEvent<HTMLInputElement, KeyboardEvent>) => {
    if (e.key === "Enter") {
      // Use the current URL path as the command route and command registry to execute the command
      const result = executeCommand(commandInput.value, currentDirectory.value);
      addToHistory(result);
      setCommandLine("");
      return;
    }

    caretPosition.value = e.currentTarget.selectionStart || 0;
  };

  const handleKeyDown = (
    e: TargetedEvent<HTMLInputElement, KeyboardEvent>,
  ) => {
    if (e.key === "Tab") {
      const { value, selectionStart } = e.currentTarget;
      // NOTE: Nothing typed → native Tab, so keyboard users can leave the prompt
      if (
        !completionMenu.value && !value.slice(0, selectionStart ?? 0).trim()
      ) {
        return;
      }
      e.preventDefault();
      tabComplete(e.shiftKey ? -1 : 1);
      return;
    }

    // Any other key (Esc included) ends the completion menu, keeping the text
    if (!MODIFIER_KEYS.includes(e.key)) completionMenu.value = null;

    if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent cursor from moving
      if (commandHistory.value.length === 0) return;

      const newIndex = Math.max(0, selectedHistoryIndex.value - 1);
      if (newIndex < commandHistory.value.length) {
        setCommandLine(commandHistory.value[newIndex].command);
        selectedHistoryIndex.value = newIndex;
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent cursor from moving
      const newIndex =
        selectedHistoryIndex.value < commandHistory.value.length - 1
          ? selectedHistoryIndex.value + 1
          : commandHistory.value.length;
      if (newIndex >= 0 && newIndex < commandHistory.value.length) {
        setCommandLine(commandHistory.value[newIndex].command);
      } else {
        setCommandLine(""); // Clear input if we've gone past the most recent command
      }
      selectedHistoryIndex.value = newIndex;
    }
  };

  // SecretPrompt / ExitScreen / SystemFailure own the input meanwhile
  if (promptLocked.value) return null;

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
        autoComplete="off"
        autoCapitalize="off"
        spellcheck={false}
        aria-autocomplete="list"
        aria-controls="completions"
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
        <PromptLabel user={currentUser.value} route={currentDirectory.value} />
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
        {/* Phones have no Tab key */}
        <button
          type="button"
          tabIndex={-1}
          aria-label="Complete"
          className="hidden pointer-coarse:inline-flex shrink-0 px-[1ch] border border-current"
          // NOTE: Keeps focus (and the soft keyboard) on the prompt input
          onPointerDown={(e) => e.preventDefault()}
          onClick={() => tabComplete(1)}
        >
          ⇥
        </button>
      </div>
      <CompletionList />
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
  }, [displayedHistory.value, completionMenu.value]);

  return (
    <main ref={terminalRef} className={className} onClick={focusTerminal}>
      {children}
    </main>
  );
}
