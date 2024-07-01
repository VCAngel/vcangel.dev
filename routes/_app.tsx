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
                <title>guest@vcangel</title>
            </head>
            <body className="text-sm text-gray-100 bg-zinc-900 min-h-screen p-3 flex flex-col max-h-full">
                {/* TODO Render loading page onec all logic is done! */}
                {/* <LoadingPage/> */}
                <Component />
            </body>
        </html>
    );
}
