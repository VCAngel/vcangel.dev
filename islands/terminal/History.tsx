import { ConsoleState } from "../ContextWrapper.tsx";
import { useContext } from "preact/hooks";

export default function History() {
  const { displayedHistory } = useContext(ConsoleState);

  return (
    <>
      <section id="history">
        {displayedHistory.value.map(({ command, route, response }, index) => (
          <>
            <div
              key={`prev_command_${index}`}
              className={`snap-start flex gap-2 items-center justify-start max-w-full overflow-hidden ${
                command !== "" ? "p-[2ch] py-[1ch]" : "px-[2ch] pt-[1ch]"
              }`}
            >
              <p class="shrink-0">
                <span className="text-[#C541F2] selection:bg-[#C541F2]">
                  guest@vcangel.dev
                </span>{" "}
                in{" "}
                <span className="text-[#41F2A9] selection:bg-[#41F2A9]">
                  {route.replace("/home/guest", "~")}
                </span>{" "}
                <span className="text-[#F2BB41] selection:bg-[#F2BB41]">λ</span>
              </p>
              <span className="whitespace-nowrap max-w-full">{command}</span>
            </div>
            {command !== "" ? (
              <div className="pl-[4ch]">{response()}</div>
            ) : null}
          </>
        ))}
      </section>
    </>
  );
}
