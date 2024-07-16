import { ICommandResponse, IDirectoryItem } from "../../../models/Command.ts";
import { TypewriterText } from "../Base.tsx";

export async function List(
  { command, route }: { command: string; route: string },
  params: string[],
): Promise<ICommandResponse> {
  let targetRoute = route; // Default to the current route
  const resp: ICommandResponse = {
    command,
    route: targetRoute,
    response: () => <></>,
  };

  let contentItems: IDirectoryItem[] = [];

  if (params.length > 0) {
    targetRoute = params[0];
  }

  // Fetch target route's contents
  try {
    // Fetch current route's contents
    const res = await fetch(route, { headers: { "noRender": "true" } });
    contentItems = await res.json();
    const directories = contentItems.filter((item) => item.type === "dir");

    // Check if the new route exists in the current directory
    const targetDirectory = directories.find((item) =>
      item.name === targetRoute
    );
    if (targetDirectory) {
      const slicedRoute = route.split("/");

      switch (targetRoute) {
        case "/":
          targetRoute = "/";
          break;
        case "..": {
          // Go back to the previous directory
          const prevRoute = slicedRoute.slice(0, -1);
          targetRoute = prevRoute.length === 1 ? "/" : prevRoute.join("/");
          break;
        }
        default: {
          if (route === "/") {
            targetRoute = `/${targetRoute}`;
            break;
          }

          // Go to the new directory
          targetRoute = `${route}/${targetRoute}`;
          break;
        }
      }

      // Fetch target route's contents
      const res = await fetch(targetRoute, { headers: { "noRender": "true" } });
      contentItems = await res.json();
    } else {
      if (params.length > 0) {
        throw new Error("No such file or directory");
      }
    }
  } catch (_ex) {
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
