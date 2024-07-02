import { ICommandResponse } from "../src/models/Command.ts";

export default function History({ items }: { items: ICommandResponse[] }) {
    return (
        <>
            <section id="history">
                {items.map(({ command, response }, index) => (
                    <>
                        <div
                            key={`prev_command_${index}`}
                            className="flex gap-2 items-center justify-start max-w-full overflow-hidden"
                        >
                            <p class="shrink-0">
                                <span className="text-[#C541F2]">guest</span> in
                                {" "}
                                <span className="text-[#41F2A9]">~</span>{" "}
                                <span className="text-[#F2BB41]">λ</span>
                            </p>
                            <span className="whitespace-nowrap max-w-full">
                                {command}
                            </span>
                        </div>
                        <div>
                            {response()}
                        </div>
                    </>
                ))}
            </section>
        </>
    );
}
