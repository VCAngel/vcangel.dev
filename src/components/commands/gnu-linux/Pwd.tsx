import { ICommandResponse } from "../../../models/command.model.ts";
import { TypewriterText } from "../Base.tsx";

export function Pwd({
  command,
  route,
}: {
  command: string;
  route: string;
}): ICommandResponse {
  //TODO Display the current directory
  return {
    command,
    route,
    response: () => {
      return (
        <ul class="command-wrapper">
          <li>
            <TypewriterText text={route} key="pwd_current_directory" />
          </li>
        </ul>
      );
    },
  };
}
