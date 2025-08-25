import { ICommandResponse } from "../../../models/command.model.ts";
import { TypewriterText } from "../Base.tsx";

export function Cat({
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
            text="TODO: Display file contents!"
            key="cat_file_contents"
          />
        </p>
      );
    },
  };
}
