import { findProjectImage } from "../../fs/virtualFS.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { openImageViewer } from "../../state/app.state.ts";
import { checkFile } from "../utils/fs.ts";
import { textResponse } from "../utils/output.tsx";

// Opens a project screenshot in the ImageViewer island. The viewer opens at
// execute time: response() re-runs on every History render.
export const openCommand: CommandExecutor = (args, fullCommand) => {
  const [arg] = args;
  if (!arg) {
    return textResponse(fullCommand, ["open: missing file operand"], "open");
  }

  const checked = checkFile("open", arg);
  if ("error" in checked) {
    return textResponse(fullCommand, [checked.error], "open");
  }

  const found = findProjectImage(checked.item.name);
  if (!found) {
    return textResponse(fullCommand, [
      `open: ${arg}: no application knows how to open this file`,
    ], "open");
  }

  openImageViewer(found.images, found.index);
  return textResponse(fullCommand, [
    `Opening ${checked.item.name} (${found.index + 1}/${found.images.length})` +
    " — ←/→ to browse, Esc to close",
  ], "open");
};
