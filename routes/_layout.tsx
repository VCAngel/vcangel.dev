import { PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/src/runtime/Partial.tsx";
import ContextWrapper from "../islands/ContextWrapper.tsx";
import Preview from "../islands/Preview.tsx";
import History from "../islands/terminal/History.tsx";
import NavigatorAnchor from "../islands/terminal/Navigator.tsx";
import { Terminal } from "../islands/terminal/Terminal.tsx";

export default function Wrapper({ Component }: PageProps) {
  return (
    <ContextWrapper>
      <div className="relative z-10 max-h-full min-h-screen grid grid-cols-1 grid-rows-[minmax(5ch,auto)_minmax(0,1fr)] lg:grid-cols-4 lg:grid-rows-3 p-4 gap-4">
        <Terminal className="console-pane-wrapper col-start-1 row-start-2 lg:col-span-3 lg:row-span-full">
          <NavigatorAnchor />
          <History />
          <Partial name="console">
            <div className="flex-grow flex flex-col overflow-hidden max-h-full pb-[6ch]">
              <Component />
            </div>
          </Partial>
        </Terminal>

        <Preview className="console-pane-wrapper !flex-row lg:!flex-col gap-[2ch] p-[2ch] py-[1ch] lg:row-span-2 lg:row-start-1 lg:col-start-4" />

        <aside className="console-pane-wrapper !hidden lg:!flex g:row-span-1 lg:row-start-3 lg:col-start-4">
          <div class="console-pane">
            {/* TODO Add Spotify component */}
            Current activity
          </div>
        </aside>
      </div>
    </ContextWrapper>
  );
}
