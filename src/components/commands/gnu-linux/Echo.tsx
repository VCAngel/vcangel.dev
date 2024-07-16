import { ICommandResponse } from "../../../models/Command.ts";
import { TypewriterText } from "../Base.tsx";

export function Echo({
  command,
  route,
}: {
  command: string;
  route: string;
}): ICommandResponse {
  return {
    command,
    route,
    response: () => {
      return (
        <ul class="command-wrapper">
          <li>
            <TypewriterText
              text={command}
              key="echo_print_params"
            />
          </li>
        </ul>
      );
    },
  };
}
