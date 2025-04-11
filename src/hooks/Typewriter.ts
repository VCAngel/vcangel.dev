import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

// This hook will take a string and return a string that will be displayed as if it was being typed out
const useTypewriter = (text: string, speed: number = 30) => {
  if (!text) return text;
  const displayedText = useSignal<string>("");
  const setDisplayedText = (val: string) => (displayedText.value = val);

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(displayedText.value + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return displayedText.value;
};

export default useTypewriter;
