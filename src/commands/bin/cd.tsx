import { TypewriterText } from "../../components/TypewriterText.tsx";
import { getContents, resolvePath } from "../../fs/virtualFS.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { changeDirectory, currentDirectory } from "../../state/app.state.ts";

export const cdCommand: CommandExecutor = (args, fullCommand) => {
  const initialRoute = currentDirectory.value; // NOTE: Store the initial route before any changes

  // Redirect to user's home
  if (!args.length) {
    changeDirectory("/home/guest");

    return {
      command: fullCommand,
      route: initialRoute,
      // deno-lint-ignore jsx-no-useless-fragment
      response: () => <></>,
    };
  }

  // If too many args
  if (args.length > 1) {
    return {
      command: fullCommand,
      route: initialRoute,
      response: () => (
        <pre>
          <TypewriterText
            text={`cd: Too many arguments`}
            key="cd_too_many_arguments"
          />
        </pre>
      ),
    };
  }

  // NOTE: Resolve the target path
  const targetPath = resolvePath(args[0], currentDirectory.value);

  // NOTE: Get contents from fs to check existence
  const contents = getContents(targetPath);

  if (!contents) {
    return {
      command: fullCommand,
      route: initialRoute,
      response: () => (
        <pre>
          <TypewriterText
            text={`cd: No such file or directory: ${args[0]}`}
            key="cd_no_such_file"
          />
        </pre>
      ),
    };
  }

  // Navigate to the new route
  changeDirectory(targetPath);

  return {
    command: fullCommand,
    route: initialRoute,
    // deno-lint-ignore jsx-no-useless-fragment
    response: () => <></>,
  };
};
