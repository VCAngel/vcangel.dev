import { memo } from "preact/compat";
import useTypewriter from "../hooks/Typewriter.ts"; // useTypeWriter hook
import { ICommandResponse } from "../models/Command.ts";

// Memoized TypewriterText component to prevent re-renders
const TypewriterText = memo(({ text }: { text: string }) => {
    const displayedText = useTypewriter(text);
    return <>{displayedText}</>;
});

export function Help({ command }: { command: string }): ICommandResponse {
    return {
        command,
        response: () => {
            return (
                <>
                    <ul>
                        <li className="whitespace-pre-wrap">
                            <TypewriterText
                                text="contact			Display information on how to contact me 👽"
                                key="help_commands-contact"
                            />
                        </li>
                        <li className="whitespace-pre-wrap">
                            <TypewriterText
                                text="help			Display this help message 🦕"
                                key="help_commands-help"
                            />
                        </li>
                        <li className="whitespace-pre-wrap">
                            <TypewriterText
                                text="projects		Display information about my projects 🚀"
                                key="help_commands-projects"
                            />
                        </li>
                        <li className="whitespace-pre-wrap">
                            <TypewriterText
                                text="whoami			Who are you? 👀"
                                key="help_commands-whoami"
                            />
                        </li>
                        <li className="whitespace-pre-wrap">
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
                    <ul>
                        <li className="whitespace-pre-wrap">
                            <TypewriterText
                                text="cat				Print on the stdout"
                                key="help_commands-cat"
                            />
                        </li>
                        <li className="whitespace-pre-wrap">
                            <TypewriterText
                                text="cd				Change directory"
                                key="help_commands-cd"
                            />
                        </li>
                        <li className="whitespace-pre-wrap">
                            <TypewriterText
                                text="clear			Clear the terminal"
                                key="help_commands-clear"
                            />
                        </li>
                        <li className="whitespace-pre-wrap">
                            <TypewriterText
                                text="echo			Display a line of text"
                                key="help_commands-echo"
                            />
                        </li>
                        <li className="whitespace-pre-wrap">
                            <TypewriterText
                                text="ls				List directory contents"
                                key="help_commands-list"
                            />
                        </li>
                        <li className="whitespace-pre-wrap">
                            <TypewriterText
                                text="mkdir			Make directory"
                                key="help_commands-mkdir"
                            />
                        </li>
                        <li className="whitespace-pre-wrap">
                            <TypewriterText
                                text="pwd				Print name of current/working directory"
                                key="help_commands-pwd"
                            />
                        </li>
                        <li className="whitespace-pre-wrap">
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

export function List({ command }: { command: string }): ICommandResponse {
    //TODO List all files in the current directory
    return {
        command,
        response: () => {
            return (
                <>
                    <div className="inline-flex items-center gap-4 flex-wrap">
                        <p>
                            <TypewriterText text="File 1" key="list_file-1" />
                        </p>
                        <p>
                            <TypewriterText text="File 2" key="list_file-2" />
                        </p>
                        <p>
                            <TypewriterText text="File 3" key="list_file-3" />
                        </p>
                    </div>
                </>
            );
        },
    };
}

export function Pwd({ command }: { command: string }): ICommandResponse {
    //TODO Display the current directory
    return {
        command,
        response: () => {
            return (
                <p>
                    <TypewriterText text="~" key="pwd_current_directory" />
                </p>
            );
        },
    };
}

export function Whoami({ command }: { command: string }): ICommandResponse {
    //TODO Display information about the user
    return {
        command,
        response: () => {
            return (
                <p>
                    <TypewriterText
                        text="You're an awesome person! Totally deserving of love and respect 🫶🏻🦕"
                        key="whoami_user"
                    />
                </p>
            );
        },
    };
}

export function Whois({ command }: { command: string }): ICommandResponse {
    //TODO Display information about the user
    return {
        command,
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

export function Cd({ command }: { command: string }): ICommandResponse {
    //TODO Change the current directory
    return {
        command,
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

export function Mkdir({ command }: { command: string }): ICommandResponse {
    //TODO Create a new directory
    return {
        command,
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

export function Rm({ command }: { command: string }): ICommandResponse {
    //TODO Remove a file or directory
    return {
        command,
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

export function Cat({ command }: { command: string }): ICommandResponse {
    //TODO Display the contents of a file
    return {
        command,
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

export function Echo({ command }: { command: string }): ICommandResponse {
    //TODO Display the contents of a file
    return {
        command,
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
