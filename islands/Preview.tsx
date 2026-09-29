import { TypewriterText } from "@/src/components/TypewriterText.tsx";
import {
  FASTFETCH_AVATAR_LIST,
  FASTFETCH_FIELDS,
  FASTFETCH_HANDLE,
  FetchField,
} from "@/src/data/fastfetch.ts";
import { fastfetchRun } from "@/src/state/app.state.ts";
import { useSignal } from "@preact/signals";
import { asset } from "fresh/runtime";
import { useEffect } from "preact/hooks";

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
  const avatarIndex = useSignal(0);
  /** `idle` -> nothing playing, `out` -> collapsing, `in` -> expanding. */
  const phase = useSignal<"idle" | "out" | "in">("idle");

  useEffect(() => {
    const pfpInterval = setInterval(() => {
      // Only kick off a switch if the previous one finished→
      if (phase.value === "idle") phase.value = "out";
    }, 10_000);
    return () => clearInterval(pfpInterval);
  }, []);

  // Chane animation phase when the avatar image finishes its transition
  const handleAnimationEnd = () => {
    if (phase.value === "out") {
      avatarIndex.value = (avatarIndex.value + 1) %
        FASTFETCH_AVATAR_LIST.length;
      phase.value = "in";
    } else if (phase.value === "in") {
      phase.value = "idle";
    }
  };

  return (
    <section className={className}>
      <img
        src={asset(FASTFETCH_AVATAR_LIST[avatarIndex.value])}
        onAnimationEnd={handleAnimationEnd}
        className={`rounded-[0.250rem] object-contain w-auto h-[24ch] lg:h-auto lg:w-full lg:shrink-0 ${
          phase.value === "out"
            ? "crt-screen pfp-switch-out"
            : phase.value === "in"
            ? "crt-screen pfp-switch-in"
            : ""
        }`}
      />
      <span className="border-l lg:border-b lg:border-l-0 border-slate-300 h-full lg:h-auto lg:w-full" />
      <ul
        key={`fastfetch-${run}`}
        class="flex flex-col overflow-y-auto hide-scrollbar max-h-[24ch] lg:max-h-full"
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
          <FetchFieldItem
            key={`preview_${field.id}`}
            field={field}
            keyPrefix="preview"
          />
        ))}
      </ul>
    </section>
  );
}

/** Renders a single `fastfetch` field, recursing into nested fields. */
function FetchFieldItem({
  field,
  keyPrefix,
}: {
  field: FetchField;
  keyPrefix: string;
}) {
  const id = `${keyPrefix}_${field.id}`;
  const isGroup = Array.isArray(field.value);

  return (
    <li
      key={id}
      className={`${
        field.desktopOnly ? "hidden lg:inline-flex" : "inline-flex"
      } ${isGroup ? "flex-col items-start" : "gap-[1ch] items-start"}`}
    >
      <span className="text-indigo-400 selection:bg-indigo-400">
        <TypewriterText text={field.label} key={`${id}_label`} />
      </span>
      {isGroup
        ? (
          <ul className="flex flex-col pl-[2ch]">
            {(field.value as FetchField[]).map((child) => (
              <FetchFieldItem
                key={`${id}_${child.id}`}
                field={child}
                keyPrefix={id}
              />
            ))}
          </ul>
        )
        : field.href
        ? (
          <a target="_blank" href={field.href} className={LINK_CLASSES}>
            <TypewriterText text={field.value as string} key={`${id}_val`} />
          </a>
        )
        : (
          <span>
            <TypewriterText text={field.value as string} key={`${id}_val`} />
          </span>
        )}
    </li>
  );
}
