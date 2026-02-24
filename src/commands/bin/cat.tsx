import { TypewriterText } from "../../components/TypewriterText.tsx";
import { readFile } from "../../fs/virtualFS.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";

export const catCommand: CommandExecutor = (args, fullCommand) => {
  if (args.length === 0) {
    return {
      command: fullCommand,
      response: () => (
        <pre>
          <TypewriterText
            text="cat: missing file operand"
            key="cat_missing_file_operand"
          />
        </pre>
      ),
      route: currentDirectory.value,
    };
  }

  const filename = args[0];
  const content = readFile(`${currentDirectory.value}/${filename}`);

  if (!content) {
    return {
      command: fullCommand,
      response: () => (
        <pre>
          <TypewriterText
            text={`cat: ${filename}: No such file or directory`}
            key="cat_no_such_file_or_directory"
          />
        </pre>
      ),
      route: currentDirectory.value,
    };
  }

  return {
    command: fullCommand,
    response: () => <pre>{content}</pre>,
    route: currentDirectory.value,
  };
};
