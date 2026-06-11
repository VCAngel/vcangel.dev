import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [fresh(), tailwindcss()],
  build: {
    rolldownOptions: {
      external: [
        "fresh",
        "fresh/internal",
        "fresh/runtime",
        "fresh/runtime-client",
        "@fresh/plugin-vite/client",
      ],
    },
  },
});
