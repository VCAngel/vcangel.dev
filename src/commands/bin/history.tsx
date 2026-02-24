import { TypewriterText } from "../../components/TypewriterText.tsx";
import { CommandExecutor } from "../../models/command.model.ts";
import { commandHistory, currentDirectory } from "../../state/app.state.ts";

export const historyCommand: CommandExecutor = (_args, fullCommand) => {
  const historySnapshot = commandHistory.value;
  return {
    command: fullCommand,
    route: currentDirectory.value,
    response: () => {
      return (
        <ul className="command-wrapper">
          {historySnapshot.map((historyItem, index) => (
            <li key={index}>
              <pre>
                <TypewriterText
                  text={`${index + 1} ${historyItem.command}`}
                  key={`history_${index}`}
                />
              </pre>
            </li>
          ))}
        </ul>
      );
    },
  };
};
