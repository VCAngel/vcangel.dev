import { TypewriterText } from "../../components/TypewriterText.tsx";
import {
  canTraverse,
  canWriteDir,
  hasPerm,
  WRITE,
} from "../../fs/permissions.ts";
import {
  createFile,
  isDir,
  readFile,
  splitPath,
  stat,
} from "../../fs/virtualFS.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";
import { resolve } from "../utils/fs.ts";
import { textResponse } from "../utils/output.tsx";

// Writes `text` to `target` (`>` or `>>`), returning an error message if any
function redirect(target: string, text: string, append: boolean) {
  const path = resolve(target);
  const [parent, name] = splitPath(path);
  const item = stat(path);

  if (!target) return "echo: syntax error: missing redirect target";
  if (item?.type === "dir" || path === "/") {
    return `echo: ${target}: Is a directory`;
  }
  if (!isDir(parent)) return `echo: ${target}: No such file or directory`;

  const allowed = item
    ? canTraverse(path) && hasPerm(item, WRITE)
    : canWriteDir(parent);
  if (!allowed) return `echo: ${target}: Permission denied`;

  const previous = append ? readFile(path) ?? "" : "";
  createFile(parent, name, `${previous}${text}\n`);
  return null;
}

export const echoCommand: CommandExecutor = (args, fullCommand) => {
  // `>` / `>>` either as their own token or glued to the target (`>file`)
  const redirectIndex = args.findIndex((arg) => arg.startsWith(">"));

  if (redirectIndex !== -1) {
    const operator = args[redirectIndex];
    const append = operator.startsWith(">>");
    const glued = operator.slice(append ? 2 : 1);
    const target = glued || args[redirectIndex + 1] || "";
    const text = args.slice(0, redirectIndex).join(" ");

    const error = redirect(target, text, append);
    return textResponse(fullCommand, error ? [error] : [], "echo_redirect");
  }

  return {
    command: fullCommand,
    route: currentDirectory.value,
    response: () => {
      return (
        <ul id="prewrap" class="command-wrapper">
          <li>
            <pre>
              <TypewriterText text={args.join(" ")} key="echo_print_params" />
            </pre>
          </li>
        </ul>
      );
    },
  };
};
