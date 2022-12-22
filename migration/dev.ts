#!/usr/bin/env -S deno run -A --watch=static/,routes/

import * as path from "std/path";
import dev from "$fresh/dev.ts";
import sass from "sass";

//-> Compile scss file
const baseDir = path.dirname(path.fromFileUrl(import.meta.url))
const scssFileDir = path.join(baseDir, "src/scss", "app.scss")

const compiler = sass([scssFileDir])
compiler.to_file({
  destDir: "./static/css",
  destFile: "app",
  format: "compressed"
})

await dev(import.meta.url, "./main.ts");
