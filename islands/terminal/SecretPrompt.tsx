import { TargetedEvent } from "preact/compat";
import { useEffect, useRef } from "preact/hooks";

import { CommandResponse } from "../../src/models/command.model.ts";
import {
  addToHistory,
  currentDirectory,
  focusTerminal,
  terminalInputRef,
} from "../../src/state/app.state.ts";
import { currentUser, pendingPrompt } from "../../src/state/session.state.ts";

/**
 * Masked prompt (e.g. `su` password). Replaces TerminalPrompt while
 * `pendingPrompt` is set; like a real TTY, nothing is echoed back.
 */
export default function SecretPrompt() {
  const prompt = pendingPrompt.value;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!prompt || !input) return;
    input.value = "";
    terminalInputRef.value = input;
    input.focus();
  }, [prompt]);

  if (!prompt) return null;

  const finish = (result: CommandResponse) => {
    pendingPrompt.value = null;
    // command stays empty so the secret never reaches `history`
    addToHistory({
      ...result,
      command: "",
      prompt: prompt.label,
      user: currentUser.value,
    });
    setTimeout(focusTerminal, 0);
  };

  // Enter on keyup, same as TerminalPrompt, so the key isn't replayed there
  const handleKeyUp = (e: TargetedEvent<HTMLInputElement, KeyboardEvent>) => {
    if (e.key === "Enter") finish(prompt.onSubmit(e.currentTarget.value));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" || (e.ctrlKey && e.key === "c")) {
      e.preventDefault();
      finish({
        command: "",
        route: currentDirectory.value,
        response: () => <pre>^C</pre>,
      });
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        autoComplete="off"
        spellcheck={false}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        className="absolute top-[-1000px] opacity-0"
        id="secretInput"
        name="secretInput"
        aria-label={prompt.label}
      />
      <div
        className="console-pane shrink-0 flex gap-2 items-center justify-start"
        onClick={focusTerminal}
      >
        <pre className="shrink-0">{prompt.label}</pre>
        <p className="block-caret bg-transparent m-0 p-0 w-full">
          <span class="inline-block relative whitespace-pre">
            {" "}
            <div class="absolute top-0 left-0">&nbsp;</div>
          </span>
        </p>
      </div>
    </>
  );
}
