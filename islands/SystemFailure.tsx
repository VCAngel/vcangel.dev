import { useEffect } from "preact/hooks";

import { executeCommand } from "../src/commands/registry.tsx";
import {
  addToHistory,
  currentDirectory,
  focusTerminal,
} from "../src/state/app.state.ts";
import { restoreSystem, startPersistence } from "../src/state/persistence.ts";
import { currentUser, systemNuked } from "../src/state/session.state.ts";

const PANIC_LINES = [
  "Kernel panic - not syncing: Attempted to kill init! exitcode=0x00000009",
  "CPU: 0 PID: 1 Comm: rm Tainted: G    D  6.9.420-vcangel #1",
  "Call Trace:",
  " <TASK>",
  "  rm_rf_everything+0x1337/0xdead",
  "  unlink_the_universe+0x42/0xff",
  "  guest_curiosity+0x0/0x0",
  " </TASK>",
  "---[ end Kernel panic - not syncing ]---",
];

/**
 * Always-mounted island: boots the persisted session (localStorage) and
 * takes over the whole page after `rm -rf /`.
 */
export default function SystemFailure() {
  // In an effect so SSR markup always matches the seed state
  useEffect(() => startPersistence(), []);

  if (!systemNuked.value) return null;

  const restore = () => {
    restoreSystem();
    addToHistory(executeCommand("banner", currentDirectory.value));
    setTimeout(focusTerminal, 0);
  };

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="system-failure-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-[2ch] overflow-auto"
    >
      <div className="console-pane-wrapper console-pane max-w-[90ch] w-full gap-[1ch] appear">
        <h1
          id="system-failure-title"
          className="text-[#F24141] font-majorMonoDisplay text-4xl"
        >
          500 - system not found
        </h1>
        <pre className="whitespace-pre-wrap">
          {`${currentUser.value} ran \`rm -rf /\` and deleted literally everything. (╯°□°)╯︵ ┻━┻`}
        </pre>
        <pre className="text-gray-400 text-xs overflow-x-auto hide-scrollbar">
          {PANIC_LINES.join("\n")}
        </pre>
        <button
          type="button"
          autoFocus
          onClick={restore}
          className="self-start border border-[#41F2A9] px-[2ch] py-[0.5ch] text-[#41F2A9] hover:bg-[#41F2A9] hover:text-black focus:bg-[#41F2A9] focus:text-black"
        >
          [ Restore system ]
        </button>
        <pre className="text-gray-400 text-xs whitespace-pre-wrap">
          Restores the original filesystem and clears this site's saved data
          (localStorage).
        </pre>
      </div>
    </div>
  );
}
