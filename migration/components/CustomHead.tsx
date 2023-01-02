import { JSX } from "preact";
import { Head } from "$fresh/runtime.ts";

export function CustomHead(props: JSX.HTMLAttributes<HTMLHeadElement>) {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="./favicon.ico" type="image/x-icon"/>
      <link rel="stylesheet" href="./css/app.min.css" />
      <title>{props.title} | Ángel Vargas</title>
    </Head>
  );
}
