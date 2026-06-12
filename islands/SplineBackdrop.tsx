import { asset, IS_BROWSER } from "fresh/runtime";
import type { Application } from "@splinetool/runtime";
import { useEffect, useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { isDeviceGoated } from "../src/utils/performance.ts";

const HD_MODEL_URL =
  "https://prod.spline.design/awLjgvKUH4WDBCFL/scene.splinecode";
const SD_MODEL_URL =
  "https://prod.spline.design/voxqxNJ1YBrX0pRe/scene.splinecode";

let splineAppPromise: Promise<Application | null> | null = null;

// Wait until the main thread is idle so hydration and first input are
// never blocked by the (heavy) Spline runtime.
const whenIdle = () =>
  new Promise<void>((resolve) => {
    if ("requestIdleCallback" in globalThis) {
      globalThis.requestIdleCallback(() => resolve(), { timeout: 4000 });
    } else {
      setTimeout(resolve, 1500);
    }
  });

async function loadSplineApp(): Promise<Application | null> {
  if (!IS_BROWSER) {
    return null;
  }

  // The backdrop is purely decorative — skip the runtime entirely for
  // users that asked for less motion or are saving data.
  if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  const connection =
    (navigator as { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) {
    return null;
  }

  await whenIdle();

  const deviceBenchmark = isDeviceGoated();
  const model = deviceBenchmark.webGLGood &&
      deviceBenchmark.benchmarkGood &&
      deviceBenchmark.memoryGood
    ? HD_MODEL_URL
    : SD_MODEL_URL;

  if (model === SD_MODEL_URL) {
    console.info("Device is not powerful enough to run the HD model");
  }

  try {
    // Dynamic import keeps the ~800 KB runtime out of the island bundle;
    // it only loads after the page is interactive.
    const { Application } = await import("@splinetool/runtime");

    const canvas = document.createElement("canvas");
    canvas.id = "canvas3d";
    canvas.style.cssText = "display: block; width: 100%; height: 100%;";

    const app = new Application(canvas);
    await app.load(asset(model));
    return app;
  } catch (err) {
    console.error("Loading Spline model failed: ", err);
    return null;
  }
}

export default function SplineBackdrop() {
  return (
    <section className=" absolute top-0 right-0 bottom-0 left-0">
      <SplineModel />
    </section>
  );
}

function SplineModel() {
  const status = useSignal<"loading" | "ready" | "skipped">("loading");
  const canvasContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    splineAppPromise ??= loadSplineApp();
    splineAppPromise.then((app) => {
      if (cancelled) return;

      if (app?.canvas && canvasContainer.current) {
        canvasContainer.current.appendChild(app.canvas);
        status.value = "ready";
      } else {
        status.value = "skipped";
      }
    });

    return () => {
      cancelled = true;
      if (canvasContainer.current?.firstChild) {
        canvasContainer.current.removeChild(canvasContainer.current.firstChild);
      }
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div
        className={`h-full transition-opacity duration-[2s] ease-in-out ${
          status.value === "ready" ? "appear" : "opacity-0"
        }`}
      >
        <div ref={canvasContainer} className="w-full h-full">
          {/* CANVAS RENDERS HERE */}
        </div>
      </div>

      {status.value !== "ready" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className={`font-majorMonoDisplay text-3xl ${
              status.value === "loading" ? "animate-bounce" : ""
            }`}
          >
            VA
          </h1>
        </div>
      )}
    </div>
  );
}
