import { PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
    return (
        <html>
            <head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="preload" as="style" href="./css/normalize.css" />
                <link rel="preload" as="style" href="./css/font-faces.css" />
                <link rel="preload" as="style" href="./css/app.css" />
                <link rel="stylesheet" href="./css/normalize.css" />
                <link rel="stylesheet" href="./css/font-faces.css" />
                <link rel="stylesheet" href="./css/app.css" />
                <title>vcangel | Terminal</title>
            </head>
            <body>
                <Component />
            </body>
        </html>
    );
}
