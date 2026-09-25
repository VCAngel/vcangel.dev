import { TypewriterText } from "../../components/TypewriterText.tsx";
import { contacts } from "../../data/profile.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";

const LINK_CLASSES =
  "hover:bg-[#C541F2] selection:bg-[#C541F2] text-[#C541F2] hover:text-black";

// "GitHub:   " — labels padded into one column, plus the colon and a gap
const LABEL_WIDTH = Math.max(...contacts.map(({ label }) => label.length)) + 2;

export const contactCommand: CommandExecutor = (_args, fullCommand) => {
  return {
    command: fullCommand,
    route: currentDirectory.value,
    response: () => {
      return (
        <ul className="command-wrapper">
          <li>
            <pre>
              <TypewriterText
                text="You can reach me here:"
                key="contact_header"
              />
            </pre>
          </li>
          <li>
            <pre></pre>
          </li>
          {contacts.map((channel) => (
            <li key={`contact_${channel.id}`}>
              <pre>
                <span className="text-indigo-400">
                  {`${channel.label}:`.padEnd(LABEL_WIDTH)}
                </span>
                <a target="_blank" href={channel.href} className={LINK_CLASSES}>
                  <TypewriterText
                    text={channel.text}
                    key={`contact_${channel.id}-link`}
                    speed={16}
                  />
                </a>
              </pre>
            </li>
          ))}
        </ul>
      );
    },
  };
};
