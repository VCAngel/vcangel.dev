import { useEffect } from "preact/hooks";

import { useSignal } from "@preact/signals";
import { asset } from "fresh/runtime";
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
  "Hardware name: ThinkPad X1 Regret Edition/Regret, BIOS 4.0.4",
  "Call Trace:",
  " <TASK>",
  "   rm_rf_everything+0x1337/0xdead",
  "   unlink_the_universe+0x6967/0xff",
  "   oh_it_is_too_late+0x9a/0xad",
  "   that_should_do_it+0x53/0x53",
  "   blame_the_intern+0x2/0x4",
  "   hold_my_beer+0xde/0xad",
  "   wait_a_minute+0xc1/0x9c",
  "   should_have_read_the_docs+0x1/0xdead",
  "   panic_and_run+0x1/0x1",
  "   git_blame_returned_yourself+0x1/0x1",
  "   what_have_you_done+0x48/0xff",
  "   omg_why+0x21/0xff",
  "   guest_curiosity+0x0/0x0",
  " </TASK>",
  "note: rm/1 exited with preempt_count 1",
  "note: this incident will be reported",
  "note: coffee levels critical, judgement impaired",
  "irq event stamp: 69420",
  "hardirqs last  enabled at (69419): [<ffffffff>] common_sense+0x0/0x0",
  "hardirqs last disabled at (69420): [<ffffffff>] the_moment_you_hit_enter+0x1/0x1",
  "softirqs last  enabled at (0): [<00000000>] 0x0",
  "softirqs last disabled at (0): [<00000000>] 0x0",
  "---[ end trace 0000000000000000 ]---",
  "Segmentation fault (core dumped, along with everything else)",
  "systemd[1]: Failed to start Existing.",
  "EXT4-fs error: unable to read superblock (it, too, is gone)",
  "warning: your life choices have been logged and mocked",
  "---[ end Kernel panic - not syncing ]---",
];

/**
 * Always-mounted island: boots the persisted session (localStorage) and
 * takes over the whole page after `rm -rf /`.
 */
export default function SystemFailure() {
  // In an effect so SSR markup always matches the seed state
  useEffect(() => startPersistence(), []);
  const isRestoring = useSignal(false);

  if (!systemNuked.value) return null;

  const restore = () => {
    isRestoring.value = true;
    setTimeout(() => {
      isRestoring.value = false;
      restoreSystem();
      addToHistory(executeCommand("banner", currentDirectory.value));
      setTimeout(focusTerminal, 0);
    }, 3000);
  };

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="system-failure-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black p-[2ch] overflow-auto"
    >
      <div className="console-pane-wrapper console-pane max-w-[90ch] w-full gap-[1ch] appear h-full">
        <h1
          id="system-failure-title"
          className="text-[#F24141] font-majorMonoDisplay text-5xl"
        >
          500 - system not found
        </h1>
        <pre className="whitespace-pre-wrap">
          {`${currentUser.value} ran \`rm -rf /\` and deleted literally everything. (╯°□°)╯︵ ┻━┻`}
        </pre>
        <pre className="text-gray-400 text-xs overflow-x-auto hide-scrollbar">
          {PANIC_LINES.join("\n")}

          <img
            src={asset("https://media1.tenor.com/m/dPdayRT1Y5AAAAAd/fish.gif")}
            className="mt-[2ch] w-[24ch] h-[24ch]"
          />
        </pre>

        <button
          type="button"
          autoFocus
          disabled={isRestoring.value}
          onClick={restore}
          className="self-start border border-[#41F2A9] px-[2ch] py-[0.5ch] text-[#41F2A9] hover:bg-[#41F2A9] hover:text-black focus:bg-[#41F2A9] focus:text-black"
        >
          [ {isRestoring.value ? "Hang tight..." : "Restore system"} ]
        </button>
        <pre className="text-gray-400 text-xs whitespace-pre-wrap">
          Restores the original filesystem and clears this site's saved data
          (localStorage).
        </pre>
      </div>
    </div>
  );
}
