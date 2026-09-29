import { PromptLabel } from "../../src/components/PromptLabel.tsx";
import { displayedHistory } from "../../src/state/app.state.ts";

export default function History() {
  return (
    <>
      <section id="history">
        {displayedHistory.value.map((
          { command, route, response, user, prompt },
          index,
        ) => (
          <>
            <div
              key={`prev_command_${index}`}
              className={`snap-start flex gap-2 items-center justify-start max-w-full overflow-hidden ${
                command !== "" || prompt
                  ? "p-[2ch] py-[1ch]"
                  : "px-[2ch] pt-[1ch]"
              }`}
            >
              {prompt
                ? <pre class="shrink-0">{prompt}</pre>
                : <PromptLabel user={user ?? "guest"} route={route} />}
              <span className="whitespace-nowrap max-w-full">{command}</span>
            </div>
            {command !== "" || prompt
              ? <div className="pl-[4ch]">{response()}</div>
              : null}
          </>
        ))}
      </section>
    </>
  );
}
