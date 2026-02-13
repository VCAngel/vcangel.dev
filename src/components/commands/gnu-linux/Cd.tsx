import { getContents, resolvePath } from "../../../fs/virtualFS.ts";
import {
  CommandResponse,
  NavigatorState,
} from "../../../models/command.model.ts";
import { TypewriterText } from "../Base.tsx";

export function Cd(
  { command, route }: { command: string; route: string },
  params: string[],
  navigatorState: NavigatorState,
): CommandResponse {
  const resp: CommandResponse = {
    command,
    route,
    response: () => <></>,
  };

  // Redirect to user's home
  if (params.length === 0) {
    navigatorState.setRouteToNavigate({
      route: "/home/guest",
      activatedWithCd: true,
    });
    return resp;
  }

  // If too many args
  if (params.length > 1) {
    resp.response = () => {
      return (
        <p>
          <TypewriterText
            text={`cd: Too many arguments`}
            key="cd_too_many_arguments"
          />
        </p>
      );
    };
    return resp;
  }

  // NOTE: Resolve the target path
  const targetPath = params[0];
  const resolvedPath = resolvePath(targetPath, route);

  // NOTE: Get contents from fs to check existence
  const contents = getContents(resolvedPath);

  if (!contents) {
    resp.response = () => (
      <TypewriterText
        text={`cd: No such file or directory: ${targetPath}`}
        key="cd_no_such_file"
      />
    );
    return resp;
  }

  // Navigate to the new route
  navigatorState.setRouteToNavigate({
    route: resolvedPath,
    activatedWithCd: true,
  });

  return resp;
}
