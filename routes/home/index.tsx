import { PageProps } from "$fresh/server.ts";
import { TerminalPrompt } from "../../islands/Terminal.tsx";

export default function Home({ url }: PageProps) {
  return (
    <>
      <TerminalPrompt urlPathName={url.pathname} />
    </>
  );
}
