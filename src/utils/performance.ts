/**
 * Checks if the device is capable of running the app smoothly.
 *
 * This function performs a series of checks to determine if the device has
 * sufficient GPU capabilities, memory, and performance benchmarks.
 *
 *  @returns Returns an object containing the results of the checks
 * */
export function isDeviceGoated(): {
  /** Device has WebGL support */
  webGLGood: boolean;
  /** Device passed performance test */
  benchmarkGood: boolean;
  /** Device has enough memory */
  memoryGood: boolean;
} {
  // Checklist
  const passedWebGL = checkWebGLPerformance();
  const passedBenchmark = runPerformanceBenchmark();
  const passedMemory = hasEnoughMemory();

  // If any of the checks fail, cannot guarantee good performance
  return {
    webGLGood: passedWebGL,
    benchmarkGood: passedBenchmark,
    memoryGood: passedMemory,
  };
}

function checkWebGLPerformance() {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2");

  if (!gl) {
    return false; // WebGL not supported at all
  }

  // Check WebGL extensions and capabilities
  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  if (debugInfo) {
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    console.info("GPU:", renderer);

    // blacklist of known low-performance GPUs
    const lowEndGPUs = [
      "Intel HD Graphics",
      "Intel(R) HD Graphics",
      "Intel(R) UHD Graphics",
      "GMA",
      "Mali-4",
    ];
    return !lowEndGPUs.some((gpu) => renderer.includes(gpu));
  }

  // If we can't get detailed info, fall back to other checks
  return true;
}

function hasEnoughMemory() {
  if ("deviceMemory" in navigator) {
    // Memory is reported in GB
    return (navigator as any).deviceMemory >= 4; // 4GB or more
  }

  // Fall back to other checks if deviceMemory isn't available
  return true;
}

function runPerformanceBenchmark() {
  const startTime = performance.now();
  let result = 0;

  // Do some intensive calculations idk
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(i) * Math.cos(i);
  }

  const endTime = performance.now();
  const duration = endTime - startTime;
  console.info("Performance benchmark duration:", duration);

  // Uuuh if it takes a while, consider it a low-end device
  return duration < 300; // threshold
}
