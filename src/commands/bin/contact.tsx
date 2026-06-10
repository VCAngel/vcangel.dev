import { TypewriterText } from "../../components/TypewriterText.tsx";
import { CommandExecutor } from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";

const LINK_CLASSES =
  "hover:bg-[#C541F2] selection:bg-[#C541F2] text-[#C541F2] hover:text-black";

const CHANNELS = [
  {
    id: "github",
    label: "GitHub:   ",
    text: "github.com/VCAngel",
    href: "https://github.com/VCAngel",
  },
  {
    id: "email",
    label: "Email:    ",
    text: "vcangel00@gmail.com",
    href: "mailto:vcangel00@gmail.com",
  },
  {
    id: "linkedin",
    label: "LinkedIn: ",
    text: "linkedin.com/in/vcangel",
    href: "https://www.linkedin.com/in/vcangel",
  },
];

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
          {CHANNELS.map((channel) => (
            <li key={`contact_${channel.id}`}>
              <pre>
                <span className="text-indigo-400">{channel.label}</span>
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
