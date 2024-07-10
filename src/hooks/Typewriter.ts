import { useEffect, useState } from "preact/hooks";

// This hook will take a string and return a string that will be displayed as if it was being typed out
const useTypewriter = (text: string, speed: number = 30) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setDisplayedText((prev) => prev + text[index]);
            index++;
            if (index === text.length) {
                clearInterval(intervalId);
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, speed]);

    return displayedText;
};

export default useTypewriter;
