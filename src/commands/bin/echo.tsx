import { TypewriterText } from "../../components/TypewriterText.tsx";
import { CommandExecutor } from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";

export const echoCommand: CommandExecutor = (args, fullCommand) => {
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
