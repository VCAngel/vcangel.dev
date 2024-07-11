import { createRef } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { NavigatorState } from "./ContextWrapper.tsx";

export default function NavigatorAnchor() {
    const navigatorRef = createRef<HTMLAnchorElement>();
    const { routeToNavigate, setRouteToNavigate } = useContext(NavigatorState);

    useEffect(() => {
        if (routeToNavigate.activatedWithCd && routeToNavigate.route !== "") {
            navigatorRef.current?.click();
            setRouteToNavigate({ route: "", activatedWithCd: false });
        }
    }, [routeToNavigate.route]);

    return (
        <a
            id="navigator"
            onClick={() => console.log(routeToNavigate)}
            ref={navigatorRef}
            href={routeToNavigate.route}
            className="hidden "
        >
            {routeToNavigate.route}
        </a>
    );
}
