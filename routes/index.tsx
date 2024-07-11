import { PageProps } from "$fresh/server.ts";
import { TerminalPrompt } from "../islands/Terminal.tsx";
import { IDirectoryItem } from "../src/models/Command.ts";

export const rootItems: IDirectoryItem[] = [
    { name: "home/", type: "dir" },
    { name: "test", type: "file" },
];

export default function Root({ url }: PageProps) {
    return (
        <>
            <TerminalPrompt urlPathName={url.pathname} />
        </>
    );
}
