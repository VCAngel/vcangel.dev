import { CommandExecutor } from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";

export const clearCommand: CommandExecutor = (_args, _fullCommand) => {
  return {
    command: "clear",
    route: currentDirectory.value,
    response: () => null, // Clear command doesn't produce any output
  };
};
