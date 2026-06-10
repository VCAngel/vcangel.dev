import { TypewriterText } from "../../components/TypewriterText.tsx";
import { projects } from "../../data/projects.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";

const LINK_CLASSES =
  "hover:bg-[#C541F2] selection:bg-[#C541F2] text-[#C541F2] hover:text-black";

export const projectsCommand: CommandExecutor = (_args, fullCommand) => {
  return {
    command: fullCommand,
    route: currentDirectory.value,
    response: () => {
      return (
        <ul id="prewrap" className="command-wrapper flex flex-col gap-[2ch]">
          {projects.map((project, index) => (
            <li key={`projects_${index}`}>
              <pre>
                <span className="text-indigo-400">
                  <TypewriterText
                    text={project.name}
                    key={`projects_${index}-name`}
                    speed={16}
                  />
                </span>
              </pre>
              <pre>
                <TypewriterText
                  text={`  ${project.description}`}
                  key={`projects_${index}-desc`}
                  speed={16}
                />
              </pre>
              <pre className="text-gray-400">
                <TypewriterText
                  text={`  [${project.stack.join(", ")}]`}
                  key={`projects_${index}-stack`}
                  speed={16}
                />
              </pre>
              <pre>
                {"  "}
                {project.links.map((link, linkIndex) => (
                  <a
                    target="_blank"
                    href={link.url}
                    className={LINK_CLASSES}
                    key={`projects_${index}-link-${linkIndex}`}
                  >
                    <TypewriterText
                      text={link.label}
                      key={`projects_${index}-link-${linkIndex}-text`}
                      speed={16}
                    />
                  </a>
                ))}
              </pre>
              <pre></pre>
            </li>
          ))}
        </ul>
      );
    },
  };
};
