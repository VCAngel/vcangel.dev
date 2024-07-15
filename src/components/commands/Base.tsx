import { memo } from "preact/compat";
import useTypewriter from "../../hooks/Typewriter.ts"; // useTypeWriter hook
import { ICommandResponse } from "../../models/Command.ts";

// Memoized TypewriterText component to prevent re-renders
export const TypewriterText = memo(({ text }: { text: string }) => {
  const displayedText = useTypewriter(text);
  return <>{displayedText}</>;
});

// TODO Base commands
export function Help({
  command,
  route,
}: {
  command: string;
  route: string;
}): ICommandResponse {
  return {
    command,
    route,
    response: () => {
      return (
        <>
          <ul className="command-wrapper">
            <li>
              <TypewriterText
                text="contact			Display information on how to contact me 🐸"
                key="help_commands-contact"
              />
            </li>
            <li>
              <TypewriterText
                text="help			Display this help message 👍"
                key="help_commands-help"
              />
            </li>
            <li>
              <TypewriterText
                text="projects		Display information about my projects 🚀"
                key="help_commands-projects"
              />
            </li>
            <li>
              <TypewriterText
                text="whoami			Who are you? 👀"
                key="help_commands-whoami"
              />
            </li>
            <li>
              <TypewriterText
                text="whois 			Who is VCAngel? 👨‍🚀"
                key="help_commands-whois"
              />
            </li>
          </ul>

          <p className="mt-[2ch]">
            <TypewriterText text="Other commands:" key="help_other_commands" />
          </p>
          <ul className="command-wrapper">
            <li>
              <TypewriterText
                text="cat				Print on the stdout"
                key="help_commands-cat"
              />
            </li>
            <li>
              <TypewriterText
                text="cd				Change directory"
                key="help_commands-cd"
              />
            </li>
            <li>
              <TypewriterText
                text="clear			Clear the terminal"
                key="help_commands-clear"
              />
            </li>
            <li>
              <TypewriterText
                text="echo			Display a line of text"
                key="help_commands-echo"
              />
            </li>
            <li>
              <TypewriterText
                text="ls				List directory contents"
                key="help_commands-list"
              />
            </li>
            <li>
              <TypewriterText
                text="pwd				Print name of current/working directory"
                key="help_commands-pwd"
              />
            </li>
          </ul>
        </>
      );
    },
  };
}

export function Contact({
  command,
  route,
}: {
  command: string;
  route: string;
}): ICommandResponse {
  return {
    command,
    route,
    response: () => {
      return <p>Main command: Contact</p>;
    },
  };
}

export function Projects({
  command,
  route,
}: {
  command: string;
  route: string;
}): ICommandResponse {
  return {
    command,
    route,
    response: () => {
      return <p>Main command: Projects</p>;
    },
  };
}

export function WhoAmI({
  command,
  route,
}: {
  command: string;
  route: string;
}): ICommandResponse {
  return {
    command,
    route,
    response: () => {
      return <p>Main command: WhoAmI</p>;
    },
  };
}

export function WhoIs({
  command,
  route,
}: {
  command: string;
  route: string;
}): ICommandResponse {
  return {
    command,
    route,
    response: () => {
      return <p>Main command: WhoIs</p>;
    },
  };
}
