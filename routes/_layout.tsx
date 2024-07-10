import { PageProps } from "$fresh/server.ts";
import History from "../islands/History.tsx";
import { Terminal } from "../islands/Terminal.tsx";

export default function Wrapper({ Component }: PageProps) {
    return (
        <Terminal>
            <History />
            <div class="flex-grow flex flex-col overflow-hidden max-h-full pb-[6ch]">
                <Component />
            </div>
        </Terminal>
    );
}
