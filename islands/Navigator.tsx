import { createRef } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { NavigatorState } from "./ContextWrapper.tsx";

export default function NavigatorAnchor() {
    const navigatorRef = createRef<HTMLAnchorElement>();
    const { routeToNavigate } = useContext(NavigatorState);

    useEffect(() => navigatorRef.current?.click(), [routeToNavigate]);

    return (
        <a
            id="navigator"
            onClick={() => console.log(routeToNavigate)}
            ref={navigatorRef}
            href={routeToNavigate}
            className="hidden "
        >
            {routeToNavigate}
        </a>
    );
}
