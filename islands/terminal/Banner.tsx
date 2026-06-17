import { TypewriterText } from "../../src/components/TypewriterText.tsx";
import { BANNER_LINES } from "../../src/data/banner.ts";

/**
 * Welcome banner shown on load
 */
export default function Banner() {
  return (
    <div className="command-wrapper overflow-hidden">
      {BANNER_LINES.map((line, index) => (
        <pre className="text-nowrap">
          <TypewriterText
            text={line}
            speed={10 + index * 1.1}
            key={`banner_line-${index}`}
          />
        </pre>
      ))}
      <pre className="mt-[1ch]">Welcome to my website! 🚀</pre>
      <pre>
        For a list of commands, type&nbsp;
        <code className="text-indigo-400" style="text-shadow:0 0 2px #818cf8;">
          help
        </code>{" "}
        or{" "}
        <code className="text-indigo-400" style="text-shadow:0 0 2px #818cf8;">
          ?
        </code>
        .
      </pre>
    </div>
  );
}
