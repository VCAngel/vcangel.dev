import { createRef } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { NavigatorState } from "../ContextWrapper.tsx";

export default function NavigatorAnchor() {
  const navigatorRef = createRef<HTMLAnchorElement>();
  const { routeToNavigate, setRouteToNavigate } = useContext(NavigatorState);

  useEffect(() => {
    if (
      routeToNavigate.value.activatedWithCd &&
      routeToNavigate.value.route !== ""
    ) {
      navigatorRef.current?.click();
      setRouteToNavigate({ route: "", activatedWithCd: false });
    }
  }, [routeToNavigate.value.route]);

  return (
    <a
      id="navigator"
      ref={navigatorRef}
      href={routeToNavigate.value.route}
      className="hidden "
    >
      {routeToNavigate.value.route}
    </a>
  );
}
