import { PageProps } from "$fresh/server.ts";
import { TerminalPrompt } from "../../../islands/Terminal.tsx";

export default function Guest({ url }: PageProps) {
    return (
        <>
            {/* TODO Add Spline space model or something :D */}
            <TerminalPrompt urlPathName={url.pathname} />
        </>
    );
}
