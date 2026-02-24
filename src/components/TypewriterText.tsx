import { memo } from "preact/compat";
import useTypewriter from "../hooks/Typewriter.ts";

// Memoized TypewriterText component to prevent re-renders
export const TypewriterText = memo(
  ({ text, speed }: { text: string; speed?: number }) => {
    const displayedText = useTypewriter(text, speed);
    return <>{displayedText}</>;
  },
);
