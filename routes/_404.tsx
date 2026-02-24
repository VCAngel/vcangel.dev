import { PageProps } from "$fresh/server.ts";

//TODO Implement a 404 page
export default function NotFoundPage({ url }: PageProps) {
  return <pre>404 not found! {url.pathname} :c</pre>;
}
