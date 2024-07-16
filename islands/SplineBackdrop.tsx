import { asset } from "$fresh/src/runtime/utils.ts";
import { Application } from "@splinetool/runtime";
import { createRef, Suspense } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { createResource } from "../src/utils/suspense.ts";

const splineModelResource = createResource<Application>(
  new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.id = "canvas3d";
    canvas.classList.add("w-full", "h-full");

    const app = new Application(canvas);
    const splineModel = asset(
      "https://prod.spline.design/obAagtgFjXohyWML/scene.splinecode",
    );
    app.load(splineModel).then(() => resolve(app)); // Resolve with the app instance
  }),
);

export default function SplineBackdrop() {
  return (
    <section className=" absolute top-0 right-0 bottom-0 left-0">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <h1 className="font-majorMonoDisplay animate-bounce text-2xl">
              VA
            </h1>
          </div>
        }
      >
        <SplineModel />
      </Suspense>
    </section>
  );
}

function SplineModel() {
  const [loading, setLoading] = useState(true);
  const canvasContainer = createRef<HTMLDivElement>();

  useEffect(() => {
    const { canvas } = splineModelResource.read();

    if (canvasContainer.current) {
      setLoading(false);
      canvasContainer.current.appendChild(canvas);
    }

    return () => {
      if (canvasContainer.current) {
        canvasContainer.current.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      className={`h-full opacity-0 ${
        !loading && "opacity-100 transition-opacity duration-[2s] ease-in-out"
      }`}
    >
      <div
        ref={canvasContainer}
        className={`w-full h-full ${
          loading ? "invisible" : "invisible md:visible"
        }`}
      >
        {/* -> CANVAS RENDERS HERE! */}
      </div>
    </div>
  );
}
