import { CommandExecutor } from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";

export const whoAmICommand: CommandExecutor = (_args, fullCommand) => {
  return {
    command: fullCommand,
    route: currentDirectory.value,
    response: () => {
      return <pre>Main command: WhoAmI</pre>;
    },
  };
};
