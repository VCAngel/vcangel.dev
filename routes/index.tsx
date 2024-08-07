import { Handlers, PageProps } from "$fresh/server.ts";
import { TerminalPrompt } from "../islands/terminal/Terminal.tsx";
import { IDirectoryItem } from "../src/models/Command.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const rootItems: IDirectoryItem[] = [
      { name: "/", type: "dir", ignoredByList: true },
      { name: "home", type: "dir" },
      { name: "home/guest", type: "dir", ignoredByList: true },
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

export default function Root({ url }: PageProps) {
  return (
    <>
      <TerminalPrompt urlPathName={url.pathname} />
    </>
  );
}
