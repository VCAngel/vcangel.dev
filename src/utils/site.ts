import { Site } from "../models/site.model.ts";

const SITES: Record<string, Site> = {
  "vcangel.dev": "spa",
  "cli.vcangel.dev": "terminal",
};

// Anything else (localhost, deploy previews) keeps the terminal, as before
const DEFAULT_SITE: Site = "terminal";

/**
 * Maps a Host header to the site it serves. Port, trailing dot and a
 * `.localhost` suffix are ignored, so `vcangel.dev.localhost:5173` resolves
 * like `vcangel.dev` in local dev.
 */
export function resolveSite(host: string): Site {
  const hostname = host
    .toLowerCase()
    .replace(/:\d+$/, "")
    .replace(/\.$/, "")
    .replace(/\.localhost$/, "");

  return Object.hasOwn(SITES, hostname) ? SITES[hostname] : DEFAULT_SITE;
}
