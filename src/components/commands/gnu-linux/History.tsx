import { ICommandResponse } from "../../../models/command.model.ts";
import { TypewriterText } from "../Base.tsx";

export function History({
  command,
  route,
}: {
  command: string;
  route: string;
}, history: ICommandResponse[]): ICommandResponse {
  return {
    command,
    route,
    response: () => {
      return (
        <ul className="command-wrapper">
          {history.map((historyItem, index) => (
            <li key={index}>
              <TypewriterText
                text={`${index + 1} ${historyItem.command}`}
                key={`history_${index}`}
              />
            </li>
          ))}
        </ul>
      );
    },
  };
}
