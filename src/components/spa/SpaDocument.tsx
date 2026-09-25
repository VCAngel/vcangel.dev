import { FunctionComponent } from "preact";

import { profile } from "../../data/profile.ts";

/**
 * Document shell for vcangel.dev. No islands and no `f-client-nav` here, so
 * production pages ship zero client JS (styles still come from client.ts).
 */
export default function SpaDocument(
  { Component }: { Component: FunctionComponent },
) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={profile.tagline} />
        <title>{profile.name}</title>
      </head>
      <body className="text-sm text-gray-100 bg-black min-h-screen">
        <Component />
      </body>
    </html>
  );
}
