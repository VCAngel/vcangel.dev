import { PageProps } from "fresh";
import ExitScreen from "../islands/terminal/ExitScreen.tsx";
import SecretPrompt from "../islands/terminal/SecretPrompt.tsx";
import { TerminalPrompt } from "../islands/terminal/Terminal.tsx";
import Contact from "../src/components/spa/Contact.tsx";
import Hero from "../src/components/spa/Hero.tsx";
import Projects from "../src/components/spa/Projects.tsx";
import TerminalLink from "../src/components/spa/TerminalLink.tsx";
import WhoAmI from "../src/components/spa/WhoAmI.tsx";
import { State } from "../src/models/site.model.ts";
import { terminalUrl } from "../src/utils/site.ts";

export default function Root({ state, url }: PageProps<unknown, State>) {
  if (state.site === "spa") {
    return (
      <main className="max-w-3xl mx-auto px-[2ch] py-[6ch] flex flex-col gap-[6ch]">
        <Hero />
        <WhoAmI />
        <Projects />
        <Contact />
        <TerminalLink href={terminalUrl(url)} />
      </main>
    );
  }

  return (
    <>
      <TerminalPrompt />
      <SecretPrompt />
      <ExitScreen />
    </>
  );
}
