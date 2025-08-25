import { Handlers, PageProps } from "$fresh/server.ts";
import { TerminalPrompt } from "../../../islands/terminal/Terminal.tsx";
import { IDirectoryItem } from "../../../src/models/command.model.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const rootItems: IDirectoryItem[] = [
      { name: "..", type: "dir", ignoredByList: true },
      { name: "/", type: "dir", ignoredByList: true },
      { name: "Documents", type: "dir" },
      { name: "Images", type: "dir" },
      { name: "README.md", type: "file" },
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

export default function Guest({ url }: PageProps) {
  return (
    <>
      <TerminalPrompt urlPathName={url.pathname} />
    </>
  );
}
