import { ICommandResponse } from "../../../models/Command.ts";
import { TypewriterText } from "../Base.tsx";

export function Echo({
  command,
  route,
}: {
  command: string;
  route: string;
}): ICommandResponse {
  //TODO Display the contents of a file
  return {
    command,
    route,
    response: () => {
      return (
        <p>
          <TypewriterText
            text="TODO: Echo file contents!"
            key="echo_echo_contents"
          />
        </p>
      );
    },
  };
}
