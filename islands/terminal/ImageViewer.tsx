import { asset } from "fresh/runtime";
import { useEffect, useRef, useState } from "preact/hooks";

import { closeImageViewer, imageViewer } from "../../src/state/app.state.ts";

const BUTTON_CLASSES =
  "hover:bg-[#C541F2] selection:bg-[#C541F2] text-[#C541F2] hover:text-black px-[0.5ch] text-2xl";

/**
 * Image viewer for the terminal, driven by the `imageViewer` signal
 * (`open <file>`, `projects` [n] links). Modal <dialog>: Esc, ×, or a click
 * on the backdrop close it, ←/→ browse, and focus goes back to the prompt.
 * Lives outside <Terminal> so its clicks don't trigger `focusTerminal`.
 */
export default function ImageViewer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewer = imageViewer.value;
  const isOpen = viewer !== null;

  // Keep the last image on screen while the dialog fades out
  const lastViewer = useRef(viewer);
  if (viewer) lastViewer.current = viewer;
  const shown = viewer ?? lastViewer.current;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const step = (delta: number) => {
    const current = imageViewer.value;
    if (!current) return;
    const count = current.images.length;
    imageViewer.value = {
      ...current,
      index: (current.index + delta + count) % count,
    };
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  };

  // Clicks outside the dialog box land on the dialog itself (its ::backdrop)
  const handleClick = (e: MouseEvent) => {
    const dialog = dialogRef.current;
    if (!dialog || e.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const inside = e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inside) dialog.close();
  };

  const image = shown?.images[shown.index];
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const position = shown ? `${shown.index + 1}/${shown.images.length}` : "";

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={image ? `${image.name} ${position}` : "Image viewer"}
      onClose={closeImageViewer}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      {image
        ? (
          <>
            {failedSrc === image.src
              ? (
                <pre className="text-red-400">
                  {`open: ${image.name}: failed to load image`}
                </pre>
              )
              : (
                <img
                  key={image.src}
                  src={asset(image.src)}
                  alt={image.alt ?? image.name}
                  decoding="async"
                  className="crt-screen"
                  onError={() => setFailedSrc(image.src)}
                />
              )}
            <p className="flex items-center gap-[2ch] pt-[1ch]">
              <span className="grow">
                <span className="text-indigo-400">{image.name}</span>
                {image.alt
                  ? <span className="text-gray-400">{` — ${image.alt}`}</span>
                  : null}
              </span>
              <span className="text-gray-400">{position}</span>
              {shown && shown.images.length > 1
                ? (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={() => step(-1)}
                      className={BUTTON_CLASSES}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={() => step(1)}
                      className={BUTTON_CLASSES}
                    >
                      ›
                    </button>
                  </>
                )
                : null}
              <button
                type="button"
                aria-label="Close"
                onClick={() => dialogRef.current?.close()}
                className={BUTTON_CLASSES}
              >
                ×
              </button>
            </p>
          </>
        )
        : null}
    </dialog>
  );
}
