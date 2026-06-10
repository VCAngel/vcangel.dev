import { TypewriterText } from "../../components/TypewriterText.tsx";
import { Command, CommandExecutor } from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";
import { commands } from "../registry.tsx";

const BANNER_TEXT = `
   ✦      .   .       *           .         .       ✦    .    .        .      .             .      .             .  +
 .              +   .                .     .    .     .   .        ✦         +      .  .      ✦           *    ✦   .
    | | / / ___/ _ | / |/ / ___/ __/ /       .       +       .    *       ✦    .      .           .     .           .
 +  | |/ / /__/ __ |/    / (_ / _// /__   ✦ .    *   .    .     .       .                        .    +      .       
    |___/\\___/_/ |_/_/|_/\\___/___/____/ ©2026      .     +             .                 .                    +   .
         .           *  .         .       .                       .              *                     .             
    ✦  The only limit is your imagination!  (ง•\`ω\´•)ว__/  ✦    .    .    *             .      +       *         .  
  .       *            .           *     .  .   .  +        .          . +                    ✦  .                .
     +        +     .               .      ✦  .               .                             .                .

`;

const BANNER_LINES = BANNER_TEXT.split("\n").map((line) => line.trimEnd());

// NOTE: vvv Custom commands for website

export const bannerCommand: CommandExecutor = (_args, fullCommand) => {
  const bannerLines = BANNER_LINES.map((line, index) => (
    <pre className="text-nowrap">
      <TypewriterText
        text={line}
        speed={10 + index * 1.1}
        key={`banner_line-${index}`}
      />
    </pre>
  ));

  return {
    command: fullCommand,
    route: currentDirectory.value,
    response: () => (
      <>
        <ul className="command-wrapper overflow-hidden">
          {bannerLines}
          <pre className="mt-[1ch]">Welcome to my website! 🚀</pre>
          <pre>
            For a list of commands, type&nbsp;
            <code
              className="text-indigo-400"
              style="text-shadow:0 0 2px #818cf8;"
            >
              help
            </code>{" "}
            or{" "}
            <code
              className="text-indigo-400"
              style="text-shadow:0 0 2px #818cf8;"
            >
              ?
            </code>
            .
          </pre>
        </ul>
      </>
    ),
  };
};

const helpCommandEntryFactory = (name: string, cmd: Command) => {
  if (name === "divider") {
    return (
      <>
        <br />
        <pre key={name}>Other commands:</pre>
        <br />
      </>
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

export const helpCommand: CommandExecutor = (args, fullCommand) => {
  // NOTE: If a specific command is requested, show detailed help for that command

  if (args.length > 0) {
    const targetCommandName = args[0];
    const commandEntry = commands[targetCommandName];

    if (!commandEntry) {
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

    return {
      command: fullCommand,
      route: currentDirectory.value,
      response: () => (
        <ul className="command-wrapper">
          {helpCommandEntryFactory(targetCommandName, commandEntry)}
          <li>
            <pre className="text-gray-400">
              <TypewriterText
                text={helpCommandUsageFactory(commandEntry)}
                key={`help_cmd_${targetCommandName}-usage`}
              />
            </pre>
          </li>
        </ul>
      ),
    };
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
      </>
    ),
    route: currentDirectory.value,
  };
};
