import { PageProps } from "$fresh/server.ts";
import { TerminalPrompt } from "../../../../islands/terminal/Terminal.tsx";

export default function Images({ url }: PageProps) {
  return (
    <>
      <TerminalPrompt urlPathName={url.pathname} />
    </>
  );
}
