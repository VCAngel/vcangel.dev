import { Context } from "fresh";

import { State } from "../src/models/site.model.ts";
import { resolveSite } from "../src/utils/site.ts";

// cli.vcangel.dev → terminal, vcangel.dev → SPA; routes and layouts
// branch on ctx.state.site
export default function siteMiddleware(ctx: Context<State>) {
  ctx.state.site = resolveSite(ctx.req.headers.get("host") ?? ctx.url.host);
  return ctx.next();
}
