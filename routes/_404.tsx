import { PageProps } from "$fresh/server.ts";

//TODO Implement a 404 page
export default function NotFoundPage({ url }: PageProps) {
    return <p>404 not found! {url.pathname} :c</p>;
}
