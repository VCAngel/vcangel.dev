import { getContents, resolvePath } from "../../../fs/virtualFS.ts";
import { CommandResponse } from "../../../models/command.model.ts";
import { TypewriterText } from "../Base.tsx";

export async function List(
  { command, route }: { command: string; route: string },
  params: string[],
): Promise<CommandResponse> {
  let targetRoute = route; // Default to the current route
  const resp: CommandResponse = {
    command,
    route: targetRoute,
    response: () => <></>,
  };

  // NOTE: Determine target path
  const targetPath = params.length > 0 ? params[0] : "."; // Default to current directory
  const resolvedPath = resolvePath(targetPath, route);

  // NOTE: Get contents from fs
  const contentItems = getContents(resolvedPath);

  if (!contentItems) {
    resp.response = () => (
      <TypewriterText
        text={`ls: Cannot access '${targetRoute}': No such file or directory`}
        key="ls_no_such_file"
      />
    );
    return resp;
  }

  // Return command response with dynamic content rendering
  resp.response = () => (
    <>
      <ul className="inline-flex items-center gap-4 flex-wrap command-wrapper">
        {contentItems.map((item, index) => {
          if (!item.ignoredByList) {
            return (
              <li key={`list_item-${index}`}>
                <TypewriterText
                  text={item.name}
                  key={`list_item-${index}-tw`}
                />
              </li>
            );
          }
          return null;
        })}
      </ul>
    </>
  );
  return resp;
}
