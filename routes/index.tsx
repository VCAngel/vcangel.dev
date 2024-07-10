import { PageProps } from "$fresh/server.ts";
import { TerminalPrompt } from "../islands/Terminal.tsx";

export default function Root({ url }: PageProps) {
    return (
        <>
            {/* TODO Add Spline space model or something :D */}
            <a href="/home" f-partial="/home">
                Home
            </a>
            <TerminalPrompt urlPathName={url.pathname} />
        </>
    );
}
