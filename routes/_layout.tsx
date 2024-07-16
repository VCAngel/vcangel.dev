import { PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/src/runtime/Partial.tsx";
import History from "../islands/History.tsx";
import NavigatorAnchor from "../islands/Navigator.tsx";
import { Terminal } from "../islands/Terminal.tsx";
import ContextWrapper from "../islands/ContextWrapper.tsx";

export default function Wrapper({ Component }: PageProps) {
  return (
    <ContextWrapper>
      <Terminal>
        <NavigatorAnchor />
        <History />
        <Partial name="console">
          <div class="flex-grow flex flex-col overflow-hidden max-h-full pb-[6ch]">
            <Component />
          </div>
        </Partial>
      </Terminal>
    </ContextWrapper>
  );
}
