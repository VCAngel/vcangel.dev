// Turns the full-size project screenshots in assets/images/projects/ into the
// WebP pair the sites serve from static/img/projects/:
//   <name>.webp       — lightbox view, 1920px wide
//   <name>.thumb.webp — card thumbnail, 640px wide

// NOTE: Outputs are committed (CI has no cwebp). Unchanged sources are skipped.
// Paths must match `projectImage()` in src/utils/images.ts.

const SOURCE_DIR = "assets/images/projects";
const OUTPUT_DIR = "static/img/projects";
const SOURCE_EXT = /\.(png|jpe?g)$/i;

const VARIANTS = [
  { suffix: ".webp", width: 1920, quality: 80 },
  { suffix: ".thumb.webp", width: 640, quality: 75 },
];

async function mtime(path: string): Promise<number | null> {
  try {
    return (await Deno.stat(path)).mtime?.getTime() ?? null;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) return null;
    throw error;
  }
}

async function cwebp(args: string[]) {
  try {
    const { success, stderr } = await new Deno.Command("cwebp", {
      args,
      stdout: "null",
      stderr: "piped",
    }).output();
    if (!success) throw new Error(new TextDecoder().decode(stderr));
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      console.error(
        "cwebp not found. Install libwebp (e.g. `brew install webp`).",
      );
      Deno.exit(1);
    }
    throw error;
  }
}

await Deno.mkdir(OUTPUT_DIR, { recursive: true });

let converted = 0;
let skipped = 0;

for await (const entry of Deno.readDir(SOURCE_DIR)) {
  if (!entry.isFile || !SOURCE_EXT.test(entry.name)) continue;

  const source = `${SOURCE_DIR}/${entry.name}`;
  const name = entry.name.replace(SOURCE_EXT, "");
  const sourceTime = (await mtime(source))!;

  for (const { suffix, width, quality } of VARIANTS) {
    const output = `${OUTPUT_DIR}/${name}${suffix}`;
    const outputTime = await mtime(output);
    if (outputTime !== null && outputTime >= sourceTime) {
      skipped++;
      continue;
    }

    await cwebp([
      "-quiet",
      "-metadata",
      "none",
      "-q",
      String(quality),
      "-resize",
      String(width),
      "0",
      source,
      "-o",
      output,
    ]);
    console.log(`${source} -> ${output}`);
    converted++;
  }
}

console.log(`${converted} converted, ${skipped} up to date`);
