import { asset, IS_BROWSER } from "$fresh/src/runtime/utils.ts";
import { Application } from "@splinetool/runtime";
import { createRef } from "preact/compat";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { createResource } from "../src/utils/suspense.ts";
import { isDeviceGoated } from "../src/utils/performance.ts";

const HD_MODEL_URL =
  "https://prod.spline.design/awLjgvKUH4WDBCFL/scene.splinecode";
const SD_MODEL_URL =
  "https://prod.spline.design/voxqxNJ1YBrX0pRe/scene.splinecode";

const splineModelResource = createResource<Application | null>(
  (async () => {
    if (!IS_BROWSER) {
      console.error("Not in browser");
      return null;
    }

    const deviceBenchmark = isDeviceGoated();

    const canvas = document.createElement("canvas");
    canvas.id = "canvas3d";
    canvas.style.cssText = "display: block; width: 100%; height: 100%;";

    const model =
      deviceBenchmark.webGLGood &&
      deviceBenchmark.benchmarkGood &&
      deviceBenchmark.memoryGood
        ? HD_MODEL_URL
        : SD_MODEL_URL;

    if (model === SD_MODEL_URL) {
      console.info("Device is not powerful enough to run the HD model");
    }

    try {
      const app = new Application(canvas);
      const splineModel = asset(model);
      await app.load(splineModel);
      return app;
    } catch (err) {
      console.error("Loading Spline model failed: ", err);
      return null;
    }
  })(),
);

export default function SplineBackdrop() {
  return (
    <section className=" absolute top-0 right-0 bottom-0 left-0">
      <SplineModel />
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
          if (res.result && isApplicationInstance(res.result)) {
            canvas.value = res.result.canvas as HTMLCanvasElement;
          }

          setLoading(false);
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
      console.error("Cannot load spline model => ", e);
    }
  }, [canvas.value]);

  if (loading.value) {
    return (
      <div className="w-full h-full flex items-center justify-center ">
        <h1 className="font-majorMonoDisplay animate-bounce text-3xl">VA</h1>
      </div>
    );
  }

  return (
    <div className="appear h-full transition-opacity duration-[2s] ease-in-out">
      <div ref={canvasContainer} className={"w-full h-full"}>
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
