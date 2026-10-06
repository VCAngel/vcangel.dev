import { USERS } from "../../data/users.ts";
import { PromptLabel } from "../PromptLabel.tsx";

// Not-really-an-easter-egg: an idle shell prompt that opens the CLI version.
// The caret reuses the terminal's `caret` keyframes from app.css. Wrapper is a
// div, not a p: PromptLabel renders a <pre>, which would split a <p> (and
// the link) apart when the browser parses it.
export default function TerminalLink({ href }: { href: string }) {
  return (
    <div>
      <a
        href={href}
        aria-label="Open the terminal version"
        title="psst… there's a terminal version"
        className="inline-flex items-center gap-2 opacity-50 hover:opacity-100 focus-visible:opacity-100 transition-opacity"
      >
        <PromptLabel user="guest" route={USERS.guest.home} />
        <span
          aria-hidden="true"
          className="w-[1ch] self-stretch bg-white motion-safe:animate-[caret_1s_ease-in-out_infinite]"
        />
      </a>
    </div>
  );
}
