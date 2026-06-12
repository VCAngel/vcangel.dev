import { memo } from "preact/compat";
import useTypewriter from "../hooks/Typewriter.ts";

// Memoized TypewriterText component to prevent re-renders.
// While typing, the full text is rendered invisibly to reserve its final
// layout space — the animation then never causes layout shifts.
export const TypewriterText = memo(
  ({ text, speed }: { text: string; speed?: number }) => {
    const displayedText = useTypewriter(text, speed);

    if (displayedText.length >= text.length) {
      return <>{text}</>;
    }

    return (
      <span className="relative inline-block max-w-full align-bottom">
        <span className="invisible" aria-hidden="true">
          {text}
        </span>
        <span className="absolute top-0 left-0 w-full h-full">
          {displayedText}
        </span>
      </span>
    );
  },
);
