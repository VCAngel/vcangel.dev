// Which experience a request gets, picked from its Host header
export type Site = "terminal" | "spa";

// Fresh `ctx.state`, filled by routes/_middleware.ts
export interface State {
  site: Site;
}
