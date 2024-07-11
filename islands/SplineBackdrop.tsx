import { Application } from "@splinetool/runtime";
import { asset } from "$fresh/src/runtime/utils.ts";
import { useEffect, useState } from "preact/hooks";

export default function SplineBackdrop() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const canvas = document.getElementById("canvas3d");
        if (canvas) {
            setLoading(false);
            const app = new Application(canvas as HTMLCanvasElement);
            const splineModel = asset(
                "https://prod.spline.design/obAagtgFjXohyWML/scene.splinecode",
            );
            app.load(splineModel).then(() => setLoading(false));
        }
    }, []);

    // TODO Rocket model for mobile breakpoints
    return (
        <section className=" absolute top-0 right-0 bottom-0 left-0">
            {loading && (
                <div className="w-full h-full flex items-center justify-center">
                    <h1 className="font-majorMonoDisplay animate-bounce text-2xl">
                        VA
                    </h1>
                </div>
            )}
            <div
                className={`h-full opacity-0 ${
                    !loading &&
                    "opacity-100 transition-opacity duration-[2s] ease-in-out"
                }`}
            >
                <canvas
                    className={loading ? "invisible" : "invisible md:visible"}
                    id="canvas3d"
                >
                </canvas>
            </div>
        </section>
    );
}
