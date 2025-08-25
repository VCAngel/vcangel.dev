import {
  ICommandResponse,
  IDirectoryItem,
  INavigatorState,
} from "../../../models/command.model.ts";
import { TypewriterText } from "../Base.tsx";

export async function Cd(
  { command, route }: { command: string; route: string },
  params: string[],
  navigatorState: INavigatorState,
): Promise<ICommandResponse> {
  const resp: ICommandResponse = {
    command,
    route,
    response: () => <></>,
  };

  if (params.length === 1) {
    let newRoute = params[0];

    // Fetch current route's contents
    try {
      const res = await fetch(route, { headers: { "noRender": "true" } });
      const contentItems: IDirectoryItem[] = await res.json();
      const directories = contentItems.filter((item) => item.type === "dir");
      resp.response = () => {
        return <></>;
      };
      // Check if the new route exists in the current directory
      if (directories.some((item) => item.name === newRoute)) {
        const slicedRoute = route.split("/");

        // Simplify directory navigation logic
        if (newRoute === "/") {
          newRoute = "/";
        } else if (newRoute === "..") {
          const prevRoute = slicedRoute.slice(0, -1);
          newRoute = prevRoute.length === 1 ? "/" : prevRoute.join("/");
        } else {
          newRoute = route === "/" ? `/${newRoute}` : `${route}/${newRoute}`;
        }

        navigatorState.setRouteToNavigate({
          route: newRoute,
          activatedWithCd: true,
        });
      } else {
        // If the new route doesn't exist in the current directory
        resp.response = () => (
          <TypewriterText
            text={`cd: No such file or directory: ${newRoute}`}
            key="cd_no_such_file"
          />
        );
      }
    } catch (error) {
      // Handle fetch error
      resp.response = () => (
        <TypewriterText
          text={`FATAL: Error fetching directory contents: ${error}`}
          key="cd_error_fetching_contents"
        />
      );
    }
  }

  // Redirect to user's home
  if (params.length === 0) {
    navigatorState.setRouteToNavigate({
      route: "/home/guest",
      activatedWithCd: true,
    });
  }

  // If there is more than 1 param
  if (params.length > 1) {
    resp.response = () => {
      return (
        <p>
          <TypewriterText
            text={`cd: String not in pwd: ${params[0]}`}
            key="cd_too_many_arguments"
          />
        </p>
      );
    };
  }

  return resp;
}
