import { ConsoleState } from "../routes/_app.tsx";
import { useContext } from "preact/hooks";

export default function History() {
    const consoleState = useContext(ConsoleState);
    const { displayedHistory } = consoleState.value;

    return (
        <>
            <section id="history">
                {displayedHistory.map(({ command, route, response }, index) => (
                    <>
                        <div
                            key={`prev_command_${index}`}
                            className={`flex gap-2 items-center justify-start max-w-full overflow-hidden ${
                                command !== ""
                                    ? "p-[2ch] py-[1ch]"
                                    : "px-[2ch] pt-[1ch]"
                            }`}
                        >
                            <p class="shrink-0">
                                <span className="text-[#C541F2]">guest</span> in
                                {" "}
                                <span className="text-[#41F2A9]">{route}</span>
                                {" "}
                                <span className="text-[#F2BB41]">λ</span>
                            </p>
                            <span className="whitespace-nowrap max-w-full">
                                {command}
                            </span>
                        </div>
                        {command !== ""
                            ? <div className="pl-[4ch]">{response()}</div>
                            : null}
                    </>
                ))}
            </section>
        </>
    );
}
