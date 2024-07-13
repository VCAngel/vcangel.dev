import { PageProps } from "$fresh/server.ts";
import { TerminalPrompt } from "../../../islands/Terminal.tsx";

export default function Guest({ url }: PageProps) {
  return (
    <>
      <TerminalPrompt urlPathName={url.pathname} />
    </>
  );
}
