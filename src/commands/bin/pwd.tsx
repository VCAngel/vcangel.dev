import { TypewriterText } from "../../components/TypewriterText.tsx";
import { CommandExecutor } from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";

export const pwdCommand: CommandExecutor = (_args, fullCommand) => {
  const currentDirectorySnapshot = currentDirectory.value;
  return {
    command: fullCommand,
    route: currentDirectory.value,
    response: () => {
      return (
        <ul class="command-wrapper">
          <li>
            <pre>
              <TypewriterText
                text={currentDirectorySnapshot}
                key="pwd_current_directory"
              />
            </pre>
          </li>
        </ul>
      );
    },
  };
};
