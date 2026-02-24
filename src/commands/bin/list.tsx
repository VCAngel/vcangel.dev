import { TypewriterText } from "../../components/TypewriterText.tsx";
import { getContents, resolvePath } from "../../fs/virtualFS.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";

export const lsCommand: CommandExecutor = (args, fullCommand) => {
  // NOTE: Determine target path
  const targetPath = args.length > 0 ? args[0] : "."; // Default to current directory
  const resolvedPath = resolvePath(targetPath, currentDirectory.value);

  // NOTE: Get contents from fs
  const contentItems = getContents(resolvedPath);

  if (!contentItems) {
    return {
      command: fullCommand,
      route: currentDirectory.value,
      response: () => (
        <pre>
          <TypewriterText
            text={`ls: Cannot access '${targetPath}': No such file or directory`}
            key="ls_no_such_file"
          />
        </pre>
      ),
    };
  }

  // Return command response with dynamic content rendering
  return {
    command: fullCommand,
    route: currentDirectory.value,
    response: () => (
      <>
        <ul className="inline-flex items-center gap-4 flex-wrap command-wrapper">
          {contentItems.map((item, index) => {
            if (!item.ignoredByList) {
              return (
                <li key={`list_item-${index}`}>
                  <pre>
                    <TypewriterText
                      text={item.name}
                      key={`list_item-${index}-tw`}
                    />
                  </pre>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </>
    ),
  };
};
