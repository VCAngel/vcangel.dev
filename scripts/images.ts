// Encodes the source images in assets/images/ into the WebP files the sites
// serve from static/img/:
//   assets/images/projects/<name>.{png,jpg} -> static/img/projects/
//     <name>.webp       — lightbox view, 1920px wide
//     <name>.thumb.webp — card thumbnail, 640px wide
//   assets/images/<name>.{png,jpg,gif}      -> static/img/<name>.webp
//     800px wide (avatars); GIFs keep their animation via gif2webp
// Widths are maximums: smaller sources are never upscaled.

// NOTE: Outputs are committed (CI has no libwebp). Unchanged sources are
// skipped. Project paths must match `projectImage()` in src/utils/images.ts.

interface Variant {
  suffix: string;
  width: number;
  quality: number;
}

const JOBS: { source: string; output: string; variants: Variant[] }[] = [
  {
    source: "assets/images/projects",
    output: "static/img/projects",
    variants: [
      { suffix: ".webp", width: 1920, quality: 80 },
      { suffix: ".thumb.webp", width: 640, quality: 75 },
    ],
  },
  {
    source: "assets/images",
    output: "static/img",
    variants: [{ suffix: ".webp", width: 800, quality: 82 }],
  },
];

const SOURCE_EXT = /\.(png|jpe?g|gif)$/i;

async function mtime(path: string): Promise<number | null> {
  try {
    return (await Deno.stat(path)).mtime?.getTime() ?? null;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) return null;
    throw error;
  }
}

async function run(bin: string, args: string[]) {
  try {
    const { success, stderr } = await new Deno.Command(bin, {
      args,
      stdout: "null",
      stderr: "piped",
    }).output();
    if (!success) throw new Error(new TextDecoder().decode(stderr));
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      console.error(
        `${bin} not found. Install libwebp (e.g. \`brew install webp\`).`,
      );
      Deno.exit(1);
    }
    throw error;
  }
}

// GIFs go through gif2webp (keeps frames, no resizing); the rest via cwebp
function encode(source: string, output: string, { width, quality }: Variant) {
  if (/\.gif$/i.test(source)) {
    return run("gif2webp", [
      "-quiet",
      "-q",
      String(quality),
      source,
      "-o",
      output,
    ]);
  }
  return run("cwebp", [
    "-quiet",
    "-metadata",
    "none",
    "-q",
    String(quality),
    "-resize",
    String(width),
    "0",
    "-resize_mode",
    "down_only",
    source,
    "-o",
    output,
  ]);
}

let converted = 0;
let skipped = 0;

for (const { source: sourceDir, output: outputDir, variants } of JOBS) {
  await Deno.mkdir(outputDir, { recursive: true });

  for await (const entry of Deno.readDir(sourceDir)) {
    if (!entry.isFile || !SOURCE_EXT.test(entry.name)) continue;

    const source = `${sourceDir}/${entry.name}`;
    const name = entry.name.replace(SOURCE_EXT, "");
    const sourceTime = (await mtime(source))!;

    for (const variant of variants) {
      const output = `${outputDir}/${name}${variant.suffix}`;
      const outputTime = await mtime(output);
      if (outputTime !== null && outputTime >= sourceTime) {
        skipped++;
        continue;
      }

      await encode(source, output, variant);
      console.log(`${source} -> ${output}`);
      converted++;
    }
  }
}

console.log(`${converted} converted, ${skipped} up to date`);
