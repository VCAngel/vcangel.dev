import { TypewriterText } from "../../components/TypewriterText.tsx";
import { CommandExecutor } from "../../models/command.model.ts";
import { User } from "../../models/user.model.ts";
import { currentDirectory } from "../../state/app.state.ts";
import { effectiveUser } from "../../state/session.state.ts";

const EASTER_EGGS = [
  "Idk, you tell me! m9っ`･ω･´)",
  "Thanks for visiting! (´• ω •`)ノ",
  "Someone pretty cool ( ⌐■_■)",
  "Thanks for dropping by! ( o.o)7",
  "A curious explorer, clearly (◕‿◕)",
  "...or so you claim ( •̀ω•́ )σ",
  "An absolute legend, probably (•̀ᴗ•́)و",
  "My favorite visitor so far! ٩(◕‿◕｡)۶",
  "Existential queries? In MY terminal? (⊙_⊙)",
  "Root? No no, just guest (｡•̀ᴗ-)✧",
];

const USER_EGGS: Partial<Record<User, string>> = {
  vcangel: "The one who made all this (◕‿◕)",
  root: "With great power... (•̀ᴗ•́)و",
};

export const whoAmICommand: CommandExecutor = (_args, fullCommand) => {
  const user = effectiveUser();
  const easterEgg = USER_EGGS[user] ??
    EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)];

  return {
    command: fullCommand,
    route: currentDirectory.value,
    response: () => {
      return (
        <ul className="command-wrapper">
          <li>
            <pre>
              <TypewriterText text={user} key="whoami_user" />
            </pre>
          </li>
          <li>
            <pre className="text-gray-400">
              <TypewriterText text={easterEgg} key="whoami_egg" speed={16} />
            </pre>
          </li>
        </ul>
      );
    },
  };
};
