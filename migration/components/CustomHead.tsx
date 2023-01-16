import { JSX } from "preact";
import { Head } from "$fresh/runtime.ts";

export function CustomHead(props: JSX.HTMLAttributes<HTMLHeadElement>) {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="./favicon.ico" type="image/x-icon" />
      <link rel="stylesheet" href="./css/app.min.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Emoji:wght@300;400&family=Noto+Sans+Symbols+2&family=Noto+Sans+Symbols:wght@300;400&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Ubuntu:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Source+Code+Pro:wght@300;400;500;700;900&display=swap" />
      <title>{props.title} | Ángel Vargas</title>
    </Head>
  );
}
