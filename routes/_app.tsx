import { PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import { createContext, createRef } from "preact";
import { Signal, signal } from "@preact/signals";
import { Ref } from "preact/hooks";
import { IConsoleState } from "../src/models/Command.ts";

function createConsoleState(): Signal<IConsoleState> {
    const state = signal({
        history: [],
        displayedHistory: [],
    });

    return state;
}

function createConsolePromptRefState(): [
    Ref<HTMLInputElement>,
    (el: HTMLInputElement) => void,
] {
    const ref = createRef<HTMLInputElement>();

    const setRef = (newRef: HTMLInputElement) => {
        ref.current = newRef;
    };

    return [ref, setRef];
}

export const ConsoleState = createContext<Signal<IConsoleState>>(
    signal({ history: [], displayedHistory: [], currentRoute: "" }),
);

export const ConsolePromptRefState = createContext<
    [Ref<HTMLInputElement>, (el: HTMLInputElement) => void]
>([createRef<HTMLInputElement>(), () => {}]);

export default function App({ Component }: PageProps) {
    return (
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="title" content="guest@vcangel.dev" />
                <meta
                    name="description"
                    content="Welcome to vcangel.dev! Feel free to explore around 🦕"
                />
                <meta
                    name="keywords"
                    content="portfolio,terminal,web,page,personal,resume,vcangel,github,socials,projects"
                />
                <meta name="robots" content="index, follow" />
                <meta
                    http-equiv="Content-Type"
                    content="text/html; charset=utf-8"
                />
                <meta name="language" content="English" />
                <meta name="author" content="vcangel" />
                <link
                    rel="preload"
                    as="style"
                    href={asset("/css/normalize.css")}
                />
                <link
                    rel="preload"
                    as="style"
                    href={asset("/css/font-faces.css")}
                />
                <link rel="preload" as="style" href={asset("/css/app.css")} />
                <link rel="stylesheet" href={asset("/css/normalize.css")} />
                <link rel="stylesheet" href={asset("/css/font-faces.css")} />
                <link rel="stylesheet" href={asset("/css/app.css")} />
                <title>guest@vcangel.dev</title>
            </head>
            <body
                f-client-nav
                className="relative text-sm text-gray-100 bg-zinc-900 min-h-screen flex flex-col max-h-full"
            >
                <div id="spaceBg" className="absolute -z-10" />
                <spline-viewer
                    loading-anim-type="spinner-small-dark"
                    url="https://prod.spline.design/obAagtgFjXohyWML/scene.splinecode"
                    className="absolute"
                >
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAANCAYAAADISGwcAAAG1ElEQVR4AQCBAH7/AMNfXwDEYmIAx2ZmAMtsbADOcnMA0Xh5ANJ9fQDQgIABzIB/BsZ9fQi9eXgFtHNyAKptbACiZ2YAnGJhAJhgXwCYYF8Am2JhAKFnZQCpbWsAsnNxALt5dwbDfnwIyYB+B82AfgHOfnsAzXl3AMpzcQDGbWoAw2dkAMBiYAC+YF0AAIEAfv8Aw2FeAMRjYQDHaGUAy25rAM90cgDRengA0n98AdGCfwzNgn8TxoB8Fb57eBS1dXIQq29rC6NpZQWdZWEAmWJeAJliXgCcZWABomllB6pvaw2zdnETvHx3F8SAexnKgn4WzoJ9D8+AewXOe3YAy3VwAMdvagDEaWQAwWVfAL9iXQAAgQB+/wDDZFwAxWZeAMhrYwDMcWkAz3hwANJ+dg/Tg3of0oV9LM6GfTXIhHs6v393O7Z5cTmtc2o1pW1kMZ9pYC6bZ10tm2ddLZ5pYDGkbmQ1rHRqO7V6cD++gHZCxoR6QcyHfT3Ph3wz0YR6JtCAdRbNem8EyXNpAMVtYwDCaV4AwWZcAACBAH7/AMNnWQHFalwHyG9gEsx1ZiLQfG0004JzR9SHeFnTintoz4p7dMmIeXvBhHV/uH9vf694aX6nc2N8oW5fep5sXHmdbFx6oG9ffaZzY4GueWmFt39viMCFdYjIinmFzox7fdKMe3HTiXlh0oV0Tc9/bjnMeWclyHNhFMVuXQjDbFoBAIEAfv8AxGpWRsZtWU3Jcl1ZzXhkatF/a33UhnGS1Yt2pdWOebfRj3rEy414zsOJdNO7g27Wsn1o1qp4YtWkc17UoHFb1KBxW9ajdF7YqXhi27F+aN66hG7ew4p03MuOeNbRkXrL1JF6u9aOd6fVinOR0oRtec59ZmPKd2BQx3NcQsZwWTsAgQB+/wDEbFOFxm9Wi8l0W5jOemGp0oFovdWIb9PXjXTn1pF4+dOSeP/NkHf/xoxz/72Hbf+0gWf/rHxi/6Z3Xf+jdVv/o3Vb/6Z3Xf+sfGH/tIJn/7yIbf/FjXP/zZJ3/9OUef/XlHn02JF23teNccTUh2uq0YBlkc16X3zKdlptyHNYZQCBAH7/AMRrUZ7GblSkynNZsc56X8LTgWfW1ohu69iOc//YkXf/1ZJ4/8+Rdv/IjXL/wIht/7eDZ/+vfWL/qXld/6Z3W/+mdlv/qXld/659Yf+2g2f/v4lt/8iOcv/Pk3b/1ZV4/9mVeP/aknXo2Y1wzdaHarHTgWSXz3tegMx2WXDKdFdoAIEAfv8AxWlQhcdrU4vKcViXz3dep9N/ZrrXhm3O2Yxz4dmQd/LXkXj/0ZB2/8qMc//Ch27/uYJo/7F8Yv+seF7/qHZc/6h1W/+reF3/sXxh/7iBZ//Bh23/yo1y/9GRdv/Xk3jw25N42tyQdcDbi3Ck2IVqh9R/Y2zQeV1VzXRZRctyVjwAgQB+/wDFZE9Gx2dSTMpsV1fPc15m1Htmd9iCbYraiHOb2ox3qtiNebXTjHe9zIl0wsSEb8S7f2nEs3lkw651X8Kqcl3CqnJcxK10XsWyeGLHun5nyMKEbcbLiXLA0o12ttiPeKbcjniR3Yx1eNyHcFzZgWo/1XpjJdF0XQ7Ob1gAzG1WAACBAH7/AMVeUADHYVMGy2ZYEM9tXx3UdWct2X1uPduDdEzbh3hZ2Yl6Y9SIeWnNhXVsxYBwbL16a2u1dWVqr3BhaaxuXmqrbl5srnBgb7RzY3K7eWh1w35udcyEc3HTh3dp2Yl4W9yJeEjdhnUx3IFwFtl7agDVdGMA0W5dAM5pWADNZ1YAAIEAfv8AxVhQAMdbUwDLYVgA0GhgANVwZwDZd28F3H51EtyCeR3ahHsk1YN6KM6AdyrGe3IpvnVsJ7ZwZyawa2ImrWlgJ6xoXyqvamEvtG5kNbxzaTnEeW88zH50O9SCdzXZg3kq3IN4Gd2AdQTce3AA2XRqANVuYwDRaF0AzmNYAMxhVgAAgQB+/wDFVFEAx1dUAMtcWQDQY2AA1WtoANlzcADceXYA3H57ANp/fATWf3sHz3x4B8d3cwa+cW4Dt2xoArFnYwKtZWEErWRgCbBmYg+1amUWvG9qHcR0cCLMeXQj1H14INl+eRfcfnkJ3Xt1ANx2cADZb2oA1WljANFjXQDOXlgAzFtWAAGBAH7/AMVRUQDHVFQAy1laANBhYQDVaWkA2XBwANx3dwDde3sA2319ANZ8fADPeXkAx3V0AL9vbgC3aWkAsWVkAK5iYQCtYmEAsGRiBbVnZg28bGsWxHJwHMx3dR7Uengd2Xx6Fdx7eQjdeHYA3HNxANlsagDVZmMA0WBdAM5bWQDMWVYAdZJEIuqFhYQAAAAASUVORK5CYII="
                        alt="Spline preview"
                        style="width: 100%; height: 100%;"
                    />
                </spline-viewer>

                {/* TODO Render loading page onec all logic is done! */}
                {/* <LoadingPage/> */}
                <ConsoleState.Provider value={createConsoleState()}>
                    <ConsolePromptRefState.Provider
                        value={createConsolePromptRefState()}
                    >
                        <Component />
                    </ConsolePromptRefState.Provider>
                </ConsoleState.Provider>
                <script
                    type="module"
                    src="https://unpkg.com/@splinetool/viewer@1.8.9/build/spline-viewer.js"
                    async
                >
                </script>
            </body>
        </html>
    );
}
