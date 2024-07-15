import { ICommandResponse } from "../../../models/Command.ts";
import { TypewriterText } from "../Base.tsx";

export function List({
  command,
  route,
}: {
  command: string;
  route: string;
}): ICommandResponse {
  //TODO List all files in the current directory
  return {
    command,
    route,
    response: () => {
      return (
        <>
          <ul className="inline-flex items-center gap-4 flex-wrap command-wrapper">
            <li>
              <TypewriterText text="File 1" key="list_file-1" />
            </li>
            <li>
              <TypewriterText text="File 2" key="list_file-2" />
            </li>
            <li>
              <TypewriterText text="File 3" key="list_file-3" />
            </li>
            <li>
              <TypewriterText text="File 1" key="list_file-1" />
            </li>
            <li>
              <TypewriterText text="File 2" key="list_file-2" />
            </li>
            <li>
              <TypewriterText text="File 3" key="list_file-3" />
            </li>
            <li>
              <TypewriterText text="File 4" key="list_file-4" />
            </li>
            <li>
              <TypewriterText text="File 5" key="list_file-5" />
            </li>
          </ul>
        </>
      );
    },
  };
}
