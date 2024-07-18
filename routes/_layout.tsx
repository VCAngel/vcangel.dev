import { PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/src/runtime/Partial.tsx";
import History from "../islands/terminal/History.tsx";
import NavigatorAnchor from "../islands/terminal/Navigator.tsx";
import { Terminal } from "../islands/terminal/Terminal.tsx";
import ContextWrapper from "../islands/ContextWrapper.tsx";

export default function Wrapper({ Component }: PageProps) {
  return (
    <ContextWrapper>
      <div className="relative z-10 max-h-full min-h-screen grid grid-cols-1 grid-rows-[minmax(5ch,10ch)_minmax(0,1fr)] lg:grid-cols-4 lg:grid-rows-2 2xl:grid-rows-3 p-4 gap-4">
        <Terminal className="console-pane-wrapper col-start-1 row-start-2 lg:col-span-3 lg:row-span-full">
          <NavigatorAnchor />
          <History />
          <Partial name="console">
            <div className="flex-grow flex flex-col overflow-hidden max-h-full pb-[6ch]">
              <Component />
            </div>
          </Partial>
        </Terminal>

        <section className="console-pane-wrapper !flex-row lg:!flex-col gap-[2ch] p-[2ch] py-[1ch] lg:row-span-1 lg:row-start-1 lg:col-start-4 2xl:row-span-2">
          <div class="flex-shrink-0">
            <img
              class="pixelated-image object-contain lg:flex-grow lg:w-full lg:h-auto lg:max-h-48 2xl:max-h-64"
              src="https://avatars.githubusercontent.com/u/42756104?v=4"
              alt="test"
            />
          </div>
          <div class="border-l lg:border-b lg:border-l-0 border-slate-300 h-full lg:h-auto lg:w-full">
          </div>
          <div class="whitespace-pre-wrap">
            {/* TODO Add info component */}
            About me!
          </div>
        </section>

        <aside className="console-pane-wrapper !hidden lg:!flex g:row-span-1 lg:row-start-2 lg:col-start-4 2xl:row-start-3">
          <div class="console-pane">
            {/* TODO Add Spotify component */}
            Current activity
          </div>
        </aside>
      </div>
    </ContextWrapper>
  );
}
