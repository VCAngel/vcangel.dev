import { Handlers, PageProps } from "$fresh/server.ts";
import { TerminalPrompt } from "../../../../islands/Terminal.tsx";
import { IDirectoryItem } from "../../../../src/models/Command.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const rootItems: IDirectoryItem[] = [
      { name: "..", type: "dir", ignoredByList: true },
      { name: "/", type: "dir", ignoredByList: true },
      { name: "resume.pdf", type: "file" },
    ];

    if (req.headers.get("noRender")) {
      return new Response(JSON.stringify(rootItems), {
        headers: {
          "Content-Type": "application/json",
          "location": "/",
        },
      });
    }

    return ctx.render();
  },
};

export default function Documents({ url }: PageProps) {
  return (
    <>
      <TerminalPrompt urlPathName={url.pathname} />
    </>
  );
}