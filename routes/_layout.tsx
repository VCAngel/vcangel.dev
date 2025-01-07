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
      <div className="relative z-10 max-h-full min-h-screen grid grid-cols-1 grid-rows-[minmax(5ch,auto)_minmax(0,1fr)] lg:grid-cols-4 lg:grid-rows-4 p-4 gap-4">
        <Terminal className="console-pane-wrapper col-start-1 row-start-2 lg:col-span-3 lg:row-span-full">
          <NavigatorAnchor />
          <History />
          <Partial name="console">
            <div className="flex-grow flex flex-col overflow-hidden max-h-full pb-[6ch]">
              <Component />
            </div>
          </Partial>
        </Terminal>

        <Preview className="console-pane-wrapper !flex-row lg:!flex-col gap-[2ch] p-[2ch] py-[1ch] lg:row-span-3 lg:row-start-1 lg:col-start-4" />

        {
          /* Spotify status

          TODO: Create component and fetch functionality
        */
        }
        <aside className="console-pane-wrapper !hidden lg:!flex lg:row-span-1 lg:row-start-4 lg:col-start-4">
          <div class="console-pane">
            {
              /* TODO Add realtime Spotify component

              Calls https://vca-api.deno.dev/spotify/now-playing
              Displays current song, artist, album, and album art

              Current fallback: Using github profiles spotify badge
            */
            }

            <div className="flex flex-col justify-between gap-4">
              <p>🎶 Listening to:</p>

              <a
                href="https://open.spotify.com/user/dedoloco321"
                target="_blank"
              >
                <img src="https://spotify-github-profile.kittinanx.com/api/view?uid=dedoloco321&cover_image=true&theme=natemoo-re&bar_color=99c1f1&bar_color_cover=true" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </ContextWrapper>
  );
}
