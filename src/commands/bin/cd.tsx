import { TypewriterText } from "../../components/TypewriterText.tsx";
import { USERS } from "../../data/users.ts";
import { canTraverse, EXEC, hasPerm } from "../../fs/permissions.ts";
import { resolvePath, stat } from "../../fs/virtualFS.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { changeDirectory, currentDirectory } from "../../state/app.state.ts";
import { currentUser } from "../../state/session.state.ts";

export const cdCommand: CommandExecutor = (args, fullCommand) => {
  const initialRoute = currentDirectory.value; // NOTE: Store the initial route before any changes

  // Redirect to user's home
  if (!args.length) {
    changeDirectory(USERS[currentUser.value].home);

    return {
      command: fullCommand,
      route: initialRoute,
      response: () => null,
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
  const target = stat(targetPath);

  const error = !target
    ? `cd: No such file or directory: ${args[0]}`
    : target.type !== "dir"
    ? `cd: Not a directory: ${args[0]}`
    : !canTraverse(targetPath) || !hasPerm(target, EXEC)
    ? `cd: Permission denied: ${args[0]}`
    : null;

  if (error) {
    return {
      command: fullCommand,
      route: initialRoute,
      response: () => (
        <pre>
          <TypewriterText text={error} key="cd_error" />
        </pre>
      ),
    };
  }

  // Navigate to the new route
  changeDirectory(targetPath);

  return {
    command: fullCommand,
    route: initialRoute,
    response: () => null,
  };
};
