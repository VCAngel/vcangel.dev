import { createRef } from "preact";
import { useEffect } from "preact/hooks";

const drawImage = (
  percentage: number,
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  maxPercentage: number,
) => {
  const helperCanvas = document.createElement("canvas");
  const helperCtx = helperCanvas.getContext("2d");
  const ctx = canvas?.getContext("2d");
  if (!ctx || !helperCtx) return;

  const { width, height } = image.getBoundingClientRect();

  helperCanvas.width = width * globalThis.devicePixelRatio;
  helperCanvas.height = height * globalThis.devicePixelRatio;
  canvas.width = width * globalThis.devicePixelRatio;
  canvas.height = height * globalThis.devicePixelRatio;

  // pixelate by disabling the smoothing
  ctx.imageSmoothingEnabled = false;
  helperCtx.imageSmoothingEnabled = false;

  const scaledWidth = width * percentage;
  const scaledHeight = height * percentage;

  if (percentage >= maxPercentage) {
    ctx.scale(globalThis.devicePixelRatio, globalThis.devicePixelRatio);
    ctx.drawImage(image, 0, 0, width, height);
  } else {
    helperCtx.drawImage(image, 0, 0, scaledWidth, scaledHeight);
    ctx.scale(globalThis.devicePixelRatio, globalThis.devicePixelRatio);

    if (helperCanvas.width !== 0 && helperCanvas.height !== 0) {
      ctx.drawImage(
        helperCanvas,
        0,
        0,
        scaledWidth,
        scaledHeight,
        0,
        0,
        width,
        height,
      );
    }
  }
};

const usePixelate = (src: string, increment = 0.001, {
  canvasClassName = "",
  imageClassName = "",
  maxPercentage = 1,
}: {
  canvasClassName?: string;
  imageClassName?: string;
  maxPercentage?: number;
}) => {
  const canvasRef = createRef<HTMLCanvasElement>();
  const imageRef = createRef<HTMLImageElement>();
  let percentage = 0;

  const animate = (canvas: HTMLCanvasElement, image: HTMLImageElement) => {
    drawImage(percentage, canvas, image, maxPercentage);

    // `increment` controls the speed of the transition.
    percentage += increment * (1 - percentage) * (1 - percentage);

    if (percentage <= 0.1) {
      increment *= 1.1;
    }

    if (percentage > 0.1) {
      increment *= 1.3;
    }

    if (percentage > 0.5) {
      increment *= 2;
    }

    // Ensure 'percentage' does not exceed 1.
    if (percentage <= maxPercentage) {
      globalThis.requestAnimationFrame(() => animate(canvas, image));
    }
  };

  useEffect(() => {
    globalThis.addEventListener("resize", () => {
      if (!canvasRef.current || !imageRef.current) return;
      drawImage(percentage, canvasRef.current, imageRef.current, maxPercentage);
    });

    if (!canvasRef.current || !imageRef.current) return;
    animate(canvasRef.current, imageRef.current);
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`pointer-events-none ${canvasClassName}`}
      />
      <img
        ref={imageRef}
        src={src}
        className={`pixelated-image ${imageClassName}`}
      />
    </>
  );
};

export default usePixelate;
