import { memo } from "preact/compat";
import useTypewriter from "../hooks/Typewriter.ts"; // useTypeWriter hook
import { ICommandResponse } from "../models/Command.ts";

// Memoized TypewriterText component to prevent re-renders
const TypewriterText = memo(({ text }: { text: string }) => {
    const displayedText = useTypewriter(text);
    return <>{displayedText}</>;
});

export function Help({
    command,
    route,
}: {
    command: string;
    route: string;
}): ICommandResponse {
    return {
        command,
        route,
        response: () => {
            return (
                <>
                    <ul className="command-wrapper">
                        <li>
                            <TypewriterText
                                text="contact			Display information on how to contact me 🐸"
                                key="help_commands-contact"
                            />
                        </li>
                        <li>
                            <TypewriterText
                                text="help			Display this help message 👍"
                                key="help_commands-help"
                            />
                        </li>
                        <li>
                            <TypewriterText
                                text="projects		Display information about my projects 🚀"
                                key="help_commands-projects"
                            />
                        </li>
                        <li>
                            <TypewriterText
                                text="whoami			Who are you? 👀"
                                key="help_commands-whoami"
                            />
                        </li>
                        <li>
                            <TypewriterText
                                text="whois 			Who is VCAngel? 👨‍🚀"
                                key="help_commands-whois"
                            />
                        </li>
                    </ul>

                    <p className="mt-[2ch]">
                        <TypewriterText
                            text="Other commands:"
                            key="help_other_commands"
                        />
                    </p>
                    <ul className="command-wrapper">
                        <li>
                            <TypewriterText
                                text="cat				Print on the stdout"
                                key="help_commands-cat"
                            />
                        </li>
                        <li>
                            <TypewriterText
                                text="cd				Change directory"
                                key="help_commands-cd"
                            />
                        </li>
                        <li>
                            <TypewriterText
                                text="clear			Clear the terminal"
                                key="help_commands-clear"
                            />
                        </li>
                        <li>
                            <TypewriterText
                                text="echo			Display a line of text"
                                key="help_commands-echo"
                            />
                        </li>
                        <li>
                            <TypewriterText
                                text="ls				List directory contents"
                                key="help_commands-list"
                            />
                        </li>
                        <li>
                            <TypewriterText
                                text="mkdir			Make directory"
                                key="help_commands-mkdir"
                            />
                        </li>
                        <li>
                            <TypewriterText
                                text="pwd				Print name of current/working directory"
                                key="help_commands-pwd"
                            />
                        </li>
                        <li>
                            <TypewriterText
                                text="rm				Remove files or directories"
                                key="help_commands-rm"
                            />
                        </li>
                    </ul>
                </>
            );
        },
    };
}

export function List({
    command,
    route,
}: {
    command: string;
    route: string;
}): ICommandResponse {
    //TODO List all files in the current directory
    return {
        command,
        route,
        response: () => {
            return (
                <>
                    <ul className="inline-flex items-center gap-4 flex-wrap command-wrapper">
                        <li>
                            <TypewriterText text="File 1" key="list_file-1" />
                        </li>
                        <li>
                            <TypewriterText text="File 2" key="list_file-2" />
                        </li>
                        <li>
                            <TypewriterText text="File 3" key="list_file-3" />
                        </li>
                        <li>
                            <TypewriterText text="File 1" key="list_file-1" />
                        </li>
                        <li>
                            <TypewriterText text="File 2" key="list_file-2" />
                        </li>
                        <li>
                            <TypewriterText text="File 3" key="list_file-3" />
                        </li>
                        <li>
                            <TypewriterText text="File 4" key="list_file-4" />
                        </li>
                        <li>
                            <TypewriterText text="File 5" key="list_file-5" />
                        </li>
                    </ul>
                </>
            );
        },
    };
}

export function Pwd({
    command,
    route,
}: {
    command: string;
    route: string;
}): ICommandResponse {
    //TODO Display the current directory
    return {
        command,
        route,
        response: () => {
            return (
                <p>
                    <TypewriterText text="~" key="pwd_current_directory" />
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
                    <TypewriterText
                        text="TODO: Describe myself!"
                        key="whois_user"
                    />
                </p>
            );
        },
    };
}

export function Cd({
    command,
    route,
}: {
    command: string;
    route: string;
}): ICommandResponse {
    return {
        command,
        route,
        response: () => {
            return (
                <p>
                    <TypewriterText
                        text="TODO: Change directory!"
                        key="cd_change_directory"
                    />
                </p>
            );
        },
    };
}

export function Mkdir({
    command,
    route,
}: {
    command: string;
    route: string;
}): ICommandResponse {
    //TODO Create a new directory
    return {
        command,
        route,
        response: () => {
            return (
                <p>
                    <TypewriterText
                        text="TODO: Create directory!"
                        key="mkdir_new_directory"
                    />
                </p>
            );
        },
    };
}

export function Rm({
    command,
    route,
}: {
    command: string;
    route: string;
}): ICommandResponse {
    //TODO Remove a file or directory
    return {
        command,
        route,
        response: () => {
            return (
                <p>
                    <TypewriterText
                        text="TODO: Remove file or directory!"
                        key="rm_remove_file"
                    />
                </p>
            );
        },
    };
}

export function Cat({
    command,
    route,
}: {
    command: string;
    route: string;
}): ICommandResponse {
    //TODO Display the contents of a file
    return {
        command,
        route,
        response: () => {
            return (
                <p>
                    <TypewriterText
                        text="TODO: Display file contents!"
                        key="cat_file_contents"
                    />
                </p>
            );
        },
    };
}

export function Echo({
    command,
    route,
}: {
    command: string;
    route: string;
}): ICommandResponse {
    //TODO Display the contents of a file
    return {
        command,
        route,
        response: () => {
            return (
                <p>
                    <TypewriterText
                        text="TODO: Echo file contents!"
                        key="echo_echo_contents"
                    />
                </p>
            );
        },
    };
}
