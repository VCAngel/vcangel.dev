import { TypewriterText } from "../../components/TypewriterText.tsx";
import { CommandExecutor } from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";

const EASTER_EGG =
  "Idk, you tell me! m9っ`･ω･´)";

export const whoAmICommand: CommandExecutor = (_args, fullCommand) => {
  return {
    command: fullCommand,
    route: currentDirectory.value,
    response: () => {
      return (
        <ul className="command-wrapper">
          <li>
            <pre>
              <TypewriterText text="guest" key="whoami_user" />
            </pre>
          </li>
          <li>
            <pre className="text-gray-400">
              <TypewriterText text={EASTER_EGG} key="whoami_egg" speed={16} />
            </pre>
          </li>
        </ul>
      );
    },
  };
};
