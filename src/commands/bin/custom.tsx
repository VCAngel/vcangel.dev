import { TypewriterText } from "../../components/TypewriterText.tsx";
import {
  Command,
  CommandExecutor,
  CommandResponse,
} from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";
import { commands, lookupCommand } from "../registry.tsx";

import Banner from "../../../islands/terminal/Banner.tsx";

// NOTE: vvv Custom commands for website

export const bannerCommand: CommandExecutor = (_args, fullCommand) => {
  return {
    command: fullCommand,
    route: currentDirectory.value,
    response: () => <Banner />,
  };
};

const helpCommandEntryFactory = (name: string, cmd: Command) => {
  if (name === "divider") {
    return (
      <li key={name} className="list-none">
        <br />
        <pre>Other commands:</pre>
        <br />
      </li>
    );
  }

  return (
    <li key={name}>
      <pre className="inline-flex items-center justify-start">
        <span className="text-indigo-500">
          <TypewriterText
            text={helpCommandNameFactory(name, cmd)}
            key={`help_cmd_${name}`}
            speed={0}
          />
        </span>
        <span>
          <TypewriterText
            text={helpCommandDescriptionFactory(cmd)}
            key={`help_cmd_${name}-desc`}
            speed={16}
          />
        </span>
      </pre>
    </li>
  );
};

const helpCommandNameFactory = (name: string, cmd: Command) => {
  const aliasesText = cmd.aliases ? ` (${cmd.aliases.join(", ")})` : "";
  return `${name}${aliasesText}`;
};

const helpCommandDescriptionFactory = (cmd: Command) => {
  return `${" – "}${cmd.help}`;
};

const helpCommandUsageFactory = (cmd: Command) => {
  return cmd.usage ? `Usage: ${cmd.usage}` : "";
};

// True when the command already uses `-h` for something else (ls -h)
export const usesShortHelpFlag = (cmd: Command) =>
  cmd.flags?.some(({ flag }) => /(^|[\s,])-h(?=$|[\s,])/.test(flag)) ??
    false;

// Aligned "Options:" block, always ending with the help flag itself
const helpCommandFlagsFactory = (cmd: Command) => {
  const flags = [
    ...(cmd.flags ?? []),
    {
      flag: usesShortHelpFlag(cmd) ? "--help" : "-h, --help",
      description: "Show this help",
    },
  ];
  const width = Math.max(...flags.map(({ flag }) => flag.length));
  return [
    "Options:",
    ...flags.map(({ flag, description }) =>
      `  ${flag.padEnd(width)}  ${description}`
    ),
  ];
};

// Detailed help for one command, shared by `help <cmd>` and `<cmd> --help`
export const commandHelpResponse = (
  name: string,
  cmd: Command,
  fullCommand: string,
): CommandResponse => ({
  command: fullCommand,
  route: currentDirectory.value,
  response: () => (
    <ul className="command-wrapper">
      {helpCommandEntryFactory(name, cmd)}
      <li>
        <pre className="text-gray-400">
          <TypewriterText
            text={helpCommandUsageFactory(cmd)}
            key={`help_cmd_${name}-usage`}
          />
        </pre>
      </li>
      {helpCommandFlagsFactory(cmd).map((line, index) => (
        <li key={`help_cmd_${name}-flag-${index}`}>
          <pre className="text-gray-400">
            <TypewriterText
              text={line}
              key={`help_cmd_${name}-flag-${index}-tw`}
              speed={4}
            />
          </pre>
        </li>
      ))}
    </ul>
  ),
});

export const helpCommand: CommandExecutor = (args, fullCommand) => {
  // NOTE: If a specific command is requested, show detailed help for that command

  if (args.length > 0) {
    const targetCommandName = args[0];
    const found = lookupCommand(targetCommandName);

    if (!found) {
      return {
        command: fullCommand,
        route: currentDirectory.value,
        response: () => (
          <pre>
            <TypewriterText
              text={`Command not found: ${targetCommandName}. For a list of commands, type "help".`}
              key={`help_cmd_${targetCommandName}-notfound`}
            />
          </pre>
        ),
      };
    }

    return commandHelpResponse(found[0], found[1], fullCommand);
  }

  // Default help response with dynamic command listing
  return {
    command: "help",
    response: () => (
      <>
        <pre>Available commands:</pre>
        <br />
        <ul>
          {Object.entries(commands).map(([name, cmd]) =>
            helpCommandEntryFactory(name, cmd)
          )}
        </ul>
        <br />
        <pre className="text-gray-400">
          Tip: add --help to any command (or run "help &lt;command&gt;") to
          see its options.
        </pre>
      </>
    ),
    route: currentDirectory.value,
  };
};
