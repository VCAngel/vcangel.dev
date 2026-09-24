import { USERS } from "../data/users.ts";
import { User } from "../models/user.model.ts";

// Shortens the user's home to `~`, like a real shell prompt
function displayRoute(route: string, user: User): string {
  const home = USERS[user].home;
  if (route === home) return "~";
  return route.startsWith(`${home}/`) ? `~${route.slice(home.length)}` : route;
}

/**
 * `user@vcangel.dev in ~ λ` prompt, shared by the live prompt and history
 */
export function PromptLabel({ user, route }: { user: User; route: string }) {
  return (
    <pre className="shrink-0">
      <span
        className={user === "root"
          ? "text-[#F24141] selection:bg-[#F24141]"
          : "text-[#C541F2] selection:bg-[#C541F2]"}
      >
        {user}@vcangel.dev
      </span>{" "}
      in{" "}
      <span className="text-[#41F2A9] selection:bg-[#41F2A9]">
        {displayRoute(route, user)}
      </span>{" "}
      <span className="text-[#F2BB41] selection:bg-[#F2BB41]">
        {user === "root" ? "#" : "λ"}
      </span>
    </pre>
  );
}
