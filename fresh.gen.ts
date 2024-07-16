// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $home_guest_Documents_index from "./routes/home/guest/Documents/index.tsx";
import * as $home_guest_Images_index from "./routes/home/guest/Images/index.tsx";
import * as $home_guest_index from "./routes/home/guest/index.tsx";
import * as $home_index from "./routes/home/index.tsx";
import * as $index from "./routes/index.tsx";
import * as $ContextWrapper from "./islands/ContextWrapper.tsx";
import * as $SplineBackdrop from "./islands/SplineBackdrop.tsx";
import * as $terminal_History from "./islands/terminal/History.tsx";
import * as $terminal_Navigator from "./islands/terminal/Navigator.tsx";
import * as $terminal_Terminal from "./islands/terminal/Terminal.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/home/guest/Documents/index.tsx": $home_guest_Documents_index,
    "./routes/home/guest/Images/index.tsx": $home_guest_Images_index,
    "./routes/home/guest/index.tsx": $home_guest_index,
    "./routes/home/index.tsx": $home_index,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/ContextWrapper.tsx": $ContextWrapper,
    "./islands/SplineBackdrop.tsx": $SplineBackdrop,
    "./islands/terminal/History.tsx": $terminal_History,
    "./islands/terminal/Navigator.tsx": $terminal_Navigator,
    "./islands/terminal/Terminal.tsx": $terminal_Terminal,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
