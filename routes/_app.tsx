import { PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import SplineBackdrop from "../islands/SplineBackdrop.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content="guest@vcangel.dev" />
        <meta
          name="description"
          content="Welcome to vcangel.dev! Feel free to explore around 🦕"
        />
        <meta
          name="keywords"
          content="portfolio,terminal,web,page,personal,resume,vcangel,github,socials,projects"
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="vcangel" />
        <link
          rel="preload"
          as="fetch"
          href={asset(
            "https://prod.spline.design/obAagtgFjXohyWML/scene.splinecode",
          )}
        />
        <link rel="preload" as="style" href={asset("/css/normalize.css")} />
        <link rel="preload" as="style" href={asset("/css/font-faces.css")} />
        <link rel="preload" as="style" href={asset("/css/app.css")} />
        <link rel="stylesheet" href={asset("/css/normalize.css")} />
        <link rel="stylesheet" href={asset("/css/font-faces.css")} />
        <link rel="stylesheet" href={asset("/css/app.css")} />
        <title>guest@vcangel.dev</title>
      </head>
      <body
        f-client-nav
        className="relative text-sm text-gray-100 bg-zinc-900 min-h-screen max-h-full flex flex-col"
      >
        <div id="spaceBg" className="absolute -z-10" />

        <SplineBackdrop />

        <Component />
      </body>
    </html>
  );
}
