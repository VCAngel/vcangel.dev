import { PageProps } from "$fresh/server.ts";
import { TerminalPrompt } from "../islands/terminal/Terminal.tsx";

export default function Root({ url }: PageProps) {
  return (
    <>
      <TerminalPrompt urlPathName={url.pathname} />
    </>
  );
}
