import { canRead } from "../../fs/permissions.ts";
import { listChildren, splitPath } from "../../fs/virtualFS.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { MediaFile } from "../../models/fs.model.ts";
import { openImageViewer } from "../../state/app.state.ts";
import { checkFile } from "../utils/fs.ts";
import { textResponse } from "../utils/output.tsx";

const IMAGE_NAME = /\.(avif|bmp|gif|ico|jpe?g|png|svg|webp)$/i;

// Opens an image in the ImageViewer island, browsable along with the other
// images in its directory (like `feh` on a folder). What counts is the file's
// content (`media`), not its name: a renamed image still opens, a text file
// called `x.png` doesn't. The viewer opens at execute time: response() re-runs
// on every History render.
export const openCommand: CommandExecutor = (args, fullCommand) => {
  const [arg] = args;
  if (!arg) {
    return textResponse(fullCommand, ["open: missing file operand"], "open");
  }

  const checked = checkFile("open", arg);
  if ("error" in checked) {
    return textResponse(fullCommand, [checked.error], "open");
  }

  const { path, item } = checked;
  if (!item.media) {
    const error = IMAGE_NAME.test(item.name)
      ? `open: ${arg}: not a valid image file`
      : `open: ${arg}: no application knows how to open this file`;
    return textResponse(fullCommand, [error], "open");
  }

  const [dir] = splitPath(path);
  const siblings = canRead(dir) ? listChildren(dir) : [item];
  const images: MediaFile[] = siblings
    .filter((child) => child.media)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((child) => ({ name: child.name, ...child.media! }));
  const index = images.findIndex((image) => image.name === item.name);

  openImageViewer(images, index);
  return textResponse(fullCommand, [
    `Opening ${item.name} (${index + 1}/${images.length})` +
    (images.length > 1 ? " — ←/→ to browse, Esc to close" : " — Esc to close"),
  ], "open");
};
