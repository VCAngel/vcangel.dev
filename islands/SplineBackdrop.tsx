import { asset, IS_BROWSER } from "$fresh/src/runtime/utils.ts";
import { Application } from "@splinetool/runtime";
import { createRef, Suspense } from "preact/compat";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { createResource } from "../src/utils/suspense.ts";

const splineModelResource = createResource<Application | null>(
  new Promise<Application | null>((resolve) => {
    if (!IS_BROWSER) return resolve(null);

    const canvas = document.createElement("canvas");
    canvas.id = "canvas3d";
    canvas.classList.add("w-full", "h-full");

    const app = new Application(canvas);
    const splineModel = asset(
      "https://prod.spline.design/obAagtgFjXohyWML/scene.splinecode",
    );

    app
      .load(splineModel)
      .then(() => resolve(app)) // Resolve with the app instance
      .catch((err) => console.error(err)); // Log any errors
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
  const loading = useSignal<boolean>(true);
  const setLoading = (val: boolean) => (loading.value = val);
  const canvasContainer = createRef<HTMLDivElement>();
  const canvas = useSignal<HTMLCanvasElement | null>(null);

  useEffect(() => {
    try {
      if (!canvas.value) {
        splineModelResource.read().then((res) => {
          if (res.result && isApplicationInstance(res.result))
            canvas.value = res.result.canvas as HTMLCanvasElement;
        });

        return;
      }

      if (canvasContainer.current && canvas.value) {
        setLoading(false);
        canvasContainer.current.appendChild(canvas.value);
      }

      return () => {
        if (canvasContainer.current) {
          canvasContainer.current.removeChild(canvas.value as Node);
        }
      };
    } catch (e) {
      console.error("Loading canvas! => ", e);
    }
  }, [canvas.value]);

  return (
    <div
      className={`h-full opacity-0 ${
        !loading.value &&
        "opacity-100 transition-opacity duration-[2s] ease-in-out"
      }`}
    >
      <div
        ref={canvasContainer}
        className={`w-full h-full ${
          loading.value ? "invisible" : "invisible md:visible"
        }`}
      >
        {/* CANVAS RENDERS HERE */}
      </div>
    </div>
  );
}

const isApplicationInstance = (value: unknown): value is Application => {
  return (
    typeof value === "object" &&
    value !== null &&
    "canvas" in value &&
    "load" in value
  );
};
