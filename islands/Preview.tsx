import { TypewriterText } from "@/src/components/TypewriterText.tsx";
import {
  FASTFETCH_AVATAR,
  FASTFETCH_FIELDS,
  FASTFETCH_HANDLE,
  FetchField,
} from "@/src/data/fastfetch.ts";
import { fastfetchRun } from "@/src/state/app.state.ts";
import { asset } from "fresh/runtime";

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
      <img
        src={asset(FASTFETCH_AVATAR)}
        className="rounded-[0.125rem] object-contain w-auto h-[24ch] lg:h-auto lg:w-full lg:shrink-0 "
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
