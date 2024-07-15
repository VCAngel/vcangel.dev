import { ICommandResponse } from "../../../models/Command.ts";
import { TypewriterText } from "../Base.tsx";

export function Whois({
  command,
  route,
}: {
  command: string;
  route: string;
}): ICommandResponse {
  //TODO Display information about the user
  return {
    command,
    route,
    response: () => {
      return (
        <p>
          <TypewriterText text="TODO: Describe myself!" key="whois_user" />
        </p>
      );
    },
  };
}

export function Whoami({
  command,
  route,
}: {
  command: string;
  route: string;
}): ICommandResponse {
  //TODO Display information about the user
  return {
    command,
    route,
    response: () => {
      return (
        <p>
          <TypewriterText
            text="You're an awesome person! Totally deserving of love and respect 🫶 🦕"
            key="whoami_user"
          />
        </p>
      );
    },
  };
}
