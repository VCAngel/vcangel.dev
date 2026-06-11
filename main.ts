import { App, staticFiles, trailingSlashes } from "fresh";

export const app = new App()
  // Add static file serving middleware
  .use(staticFiles())
  // Enable file-system based routing
  .fsRoutes()
  // Handle trailling slashes in URLs
  .use(trailingSlashes("never"));
