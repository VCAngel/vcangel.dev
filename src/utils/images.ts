import { asset } from "fresh/runtime";

/**
 * Served paths of a project screenshot
 * WARN: Must match the output naming of `scripts/images.ts` (`deno task images`)
 */
export function projectImage(name: string): { thumb: string; full: string } {
  return {
    thumb: asset(`/img/projects/${name}.thumb.webp`),
    full: asset(`/img/projects/${name}.webp`),
  };
}
