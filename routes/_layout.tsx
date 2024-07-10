import { PageProps } from "$fresh/server.ts";
import History from "../islands/History.tsx";
import { Terminal } from "../islands/Terminal.tsx";
import { Partial } from "$fresh/src/runtime/Partial.tsx";

export default function Wrapper({ Component }: PageProps) {
    return (
        <Terminal>
            <History />
            <Partial name="console">
                <div class="flex-grow flex flex-col overflow-hidden max-h-full pb-[6ch]">
                    <Component />
                </div>
            </Partial>
        </Terminal>
    );
}
