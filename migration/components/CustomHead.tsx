import { JSX } from "preact";
import { Head } from "$fresh/runtime.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function CustomHead(props: JSX.HTMLAttributes<HTMLHeadElement>) {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      <link rel="stylesheet" href="./css/app.min.css" />
      <title>Hey there! | Ángel Vargas</title>
    </Head>
  );
}
