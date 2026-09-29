import { useEffect } from "preact/hooks";

import { executeCommand } from "../../src/commands/registry.tsx";
import {
  addToHistory,
  clearHistory,
  currentDirectory,
  focusTerminal,
} from "../../src/state/app.state.ts";
import { sessionExited } from "../../src/state/session.state.ts";

/**
 * Shown after `exit` when the browser refuses `window.close()` (tabs the
 * visitor opened themselves). Any key or click restarts the session.
 */
export default function ExitScreen() {
  const exited = sessionExited.value;

  useEffect(() => {
    if (!exited) return;
    clearHistory();

    const restart = () => {
      sessionExited.value = false;
      addToHistory(executeCommand("banner", currentDirectory.value));
      setTimeout(focusTerminal, 0);
    };

    // Deferred so the Enter that ran `exit` can't restart right away
    const timeoutId = setTimeout(() => {
      globalThis.addEventListener("keydown", restart, { once: true });
      globalThis.addEventListener("pointerdown", restart, { once: true });
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      globalThis.removeEventListener("keydown", restart);
      globalThis.removeEventListener("pointerdown", restart);
    };
  }, [exited]);

  if (!exited) return null;

  return (
    <div className="console-pane shrink-0">
      <pre className="text-gray-400">[Process completed]</pre>
      <pre>Press any key to restart the session.</pre>
    </div>
  );
}
