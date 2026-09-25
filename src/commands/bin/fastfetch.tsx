import { CommandExecutor } from "../../models/command.model.ts";
import { fastfetchRun } from "../../state/app.state.ts";
import { textResponse } from "../utils/output.tsx";

// The Preview panel IS the fastfetch output: bumping the run counter
// re-keys it and replays the animation
export const fastfetchCommand: CommandExecutor = (_args, fullCommand) => {
  fastfetchRun.value++;
  return textResponse(
    fullCommand,
    ["→ System info fetched into the profile panel (•̀ᴗ•́)و"],
    "fastfetch",
  );
};
