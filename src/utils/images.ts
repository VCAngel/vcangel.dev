import { asset } from "fresh/runtime";

import { MediaFile } from "../models/fs.model.ts";
import { ProjectImage } from "../models/project.model.ts";

// WARN: Must match the output naming of `scripts/images.ts` (`deno task images`)
const projectImagePath = (name: string, suffix = "") =>
  `/img/projects/${name}${suffix}.webp`;

/** Served paths of a project screenshot */
export function projectImage(name: string): { thumb: string; full: string } {
  return {
    thumb: asset(projectImagePath(name, ".thumb")),
    full: asset(projectImagePath(name)),
  };
}

/** A screenshot as a file of the terminal's virtual filesystem */
export function projectImageFile(image: ProjectImage): MediaFile {
  return {
    name: `${image.name}.webp`,
    src: projectImagePath(image.name),
    alt: image.alt,
  };
}
