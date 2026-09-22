import { TypewriterText } from "../../components/TypewriterText.tsx";
import { CommandResponse } from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";

// Typing speed for bulk output (file dumps, listings)
export const FAST = 4;

export function Lines(
  { lines, id, speed, className }: {
    lines: string[];
    id: string;
    speed?: number;
    className?: string;
  },
) {
  return (
    <ul className="command-wrapper">
      {lines.map((line, index) => (
        <li key={`${id}-${index}`}>
          <pre className={className}>
            <TypewriterText
              text={line || " "}
              key={`${id}-${index}-tw`}
              speed={speed}
            />
          </pre>
        </li>
      ))}
    </ul>
  );
}

// Plain text response; route is snapshotted at execute time
export function textResponse(
  fullCommand: string,
  lines: string[],
  id: string,
  speed?: number,
): CommandResponse {
  return {
    command: fullCommand,
    route: currentDirectory.value,
    response: () =>
      lines.length ? <Lines lines={lines} id={id} speed={speed} /> : null,
  };
}

// Text without a trailing newline, split into lines
export function toLines(text: string): string[] {
  if (!text) return [];
  return (text.endsWith("\n") ? text.slice(0, -1) : text).split("\n");
}
