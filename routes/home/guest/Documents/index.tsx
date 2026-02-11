import { Handlers, PageProps } from "$fresh/server.ts";
import { TerminalPrompt } from "../../../../islands/terminal/Terminal.tsx";
import { DirectoryItem } from "../../../../src/models/fs.model.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const rootItems: DirectoryItem[] = [
      { name: "..", type: "dir", ignoredByList: true },
      { name: "/", type: "dir", ignoredByList: true },
      { name: "resume.pdf", type: "file" },
    ];

    if (req.headers.get("noRender")) {
      return new Response(JSON.stringify(rootItems), {
        headers: {
          "Content-Type": "application/json",
          location: "/",
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
