import { PageProps } from "$fresh/server.ts";

//: Islands
import MyIsland from "../islands/TestIsland.tsx";

//: Components
import MyComponent from "../components/Test.tsx";

export default function Home(props: PageProps) {
    return (
        <>
            <MyComponent />
            <MyIsland />
            <div>Loading '{props.url.href}'</div>
        </>
    );
}
