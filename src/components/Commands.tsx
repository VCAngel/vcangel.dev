import useTw from "../hooks/Typewriter.ts"; // useTypeWriter hook
import { ICommandResponse } from "../models/Command.ts";

export function Help({ command }: { command: string }): ICommandResponse {
    return {
        command,
        response: () => {
            return (
                <>
                    <p>{useTw("Available commands:")}</p>
                    <ul>
                        <li>{useTw("help - Display this help message")}</li>
                        <li>{useTw("clear - Clear the terminal")}</li>
                        <li>{useTw("about - Display information about me")}</li>
                        <li>
                            {useTw(
                                "projects - Display information about my projects",
                            )}
                        </li>
                        <li>
                            {useTw(
                                "contact - Display information on how to contact me",
                            )}
                        </li>
                    </ul>
                </>
            );
        },
    };
}
