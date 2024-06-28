import { type Config } from "tailwindcss";

export default {
    content: ["{routes,islands,components}/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                firaCode: ["FiraCode", "Noto Sans", "sans-serif"],
                majorMonoDisplay: [
                    "Major Mono Display",
                    "Noto Sans Mono",
                    "sans-serif",
                ],
            },
        },
    },
} satisfies Config;
