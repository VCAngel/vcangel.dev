import { CommandResponse } from "../../../models/command.model.ts";
import { TypewriterText } from "../Base.tsx";

export function Echo({
  command,
  route,
}: {
  command: string;
  route: string;
}): CommandResponse {
  return {
    command,
    route,
    response: () => {
      return (
        <ul id="prewrap" class="command-wrapper">
          <li>
            <TypewriterText
              text={command.replace(/^(echo\s+)/, "")}
              key="echo_print_params"
            />
          </li>
        </ul>
      );
    },
  };
}
