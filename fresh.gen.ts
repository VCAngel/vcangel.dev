// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_app from "./routes/_app.tsx";
import * as $index from "./routes/index.tsx";
import * as $History from "./islands/History.tsx";
import * as $Terminal from "./islands/Terminal.tsx";
import * as $TestIsland from "./islands/TestIsland.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
    routes: {
        "./routes/_app.tsx": $_app,
        "./routes/index.tsx": $index,
    },
    islands: {
        "./islands/History.tsx": $History,
        "./islands/Terminal.tsx": $Terminal,
        "./islands/TestIsland.tsx": $TestIsland,
    },
    baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
