import { ICommandResponse } from "../../../models/Command.ts";
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
        <p>
          <TypewriterText text="~" key="pwd_current_directory" />
        </p>
      );
    },
  };
}
