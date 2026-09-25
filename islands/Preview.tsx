import { asset } from "fresh/runtime";
import { TypewriterText } from "../src/components/TypewriterText.tsx";
import {
  FASTFETCH_AVATAR,
  FASTFETCH_FIELDS,
  FASTFETCH_HANDLE,
} from "../src/data/fastfetch.ts";
import usePixelate from "../src/hooks/Pixelate.tsx";
import { fastfetchRun } from "../src/state/app.state.ts";

const LINK_CLASSES =
  "hover:bg-[#C541F2] selection:bg-[#C541F2] text-[#C541F2] hover:text-black";

/**
 * Profile panel, a.k.a. `fastfetch` output.
 *
 * Page load counts as the first run; each `fastfetch` bumps `fastfetchRun`,
 * re-keying the list so the typewriter animation plays again.
 */
export default function Preview({ className }: { className?: string }) {
  const run = fastfetchRun.value;

  return (
    <section className={className}>
      {usePixelate(asset(FASTFETCH_AVATAR), 0.0005, {
        canvasClassName:
          "object-contain w-auto h-[16ch] lg:h-32 lg:w-full 2xl:h-48 shrink-0",
        maxPercentage: 0.25,
      })}

      <div className="border-l lg:border-b lg:border-l-0 border-slate-300 h-full lg:h-auto lg:w-full">
      </div>
      <ul
        key={`fastfetch-${run}`}
        class="flex flex-col overflow-y-auto hide-scrollbar max-h-[16ch] lg:max-h-full"
      >
        <li className="text-indigo-400 selection:bg-indigo-400">
          <a
            target="_blank"
            href={FASTFETCH_HANDLE.href}
            className={LINK_CLASSES}
          >
            <TypewriterText
              text={FASTFETCH_HANDLE.text}
              key="preview_vcangel"
            />
          </a>
        </li>
        <li className="hidden lg:block">
          <TypewriterText text="- - - - - - - -" key="preview_division" />
        </li>
        {FASTFETCH_FIELDS.map((field) => (
          <li
            key={`preview_${field.id}`}
            className={`${
              field.desktopOnly ? "hidden lg:inline-flex" : "inline-flex"
            } gap-[1ch] items-start`}
          >
            <span className="text-indigo-400 selection:bg-indigo-400">
              <TypewriterText text={field.label} key={`preview_${field.id}`} />
            </span>
            {field.href
              ? (
                <a target="_blank" href={field.href} className={LINK_CLASSES}>
                  <TypewriterText
                    text={field.value}
                    key={`preview_${field.id}_val`}
                  />
                </a>
              )
              : (
                <span>
                  <TypewriterText
                    text={field.value}
                    key={`preview_${field.id}_val`}
                  />
                </span>
              )}
          </li>
        ))}
      </ul>
    </section>
  );
}
