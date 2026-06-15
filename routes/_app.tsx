import { PageProps } from "fresh";
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
          content="Welcome! Feel free to explore around _(°︿°)_"
        />
        <meta
          name="keywords"
          content="portfolio,terminal,web,page,personal,resume,vcangel,github,socials,projects"
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="vcangel" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://cli.vcangel.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cli.vcangel.dev/" />
        <meta property="og:title" content="guest@vcangel.dev" />
        <meta
          property="og:description"
          content="Welcome! Feel free to explore around _(°︿°)_"
        />
        <meta
          property="og:image"
          content="https://cli.vcangel.dev/img/pfp.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="guest@vcangel.dev" />
        <meta
          name="twitter:description"
          content="Welcome! Feel free to explore around _(°︿°)_"
        />
        <meta
          name="twitter:image"
          content="https://cli.vcangel.dev/img/pfp.png"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/fira_code/FiraCode-VariableFont_wght.woff2"
          crossorigin="anonymous"
        />
        <title>guest@cli.vcangel.dev</title>
      </head>
      <body
        f-client-nav
        className="relative text-sm text-gray-100 bg-black min-h-screen max-h-full flex flex-col"
      >
        <div id="crt-effect" className="crt-effect" />

        <SplineBackdrop />
        <Component />
      </body>
    </html>
  );
}
