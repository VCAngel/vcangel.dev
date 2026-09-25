import ExitScreen from "../islands/terminal/ExitScreen.tsx";
import SecretPrompt from "../islands/terminal/SecretPrompt.tsx";
import { TerminalPrompt } from "../islands/terminal/Terminal.tsx";

export default function Root() {
  return (
    <>
      <TerminalPrompt />
      <SecretPrompt />
      <ExitScreen />
    </>
  );
}
