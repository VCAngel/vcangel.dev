export default function History({ items }: { items: unknown[] }) {
    //TODO Iterate over items and render them based on the component sent
    return (
        <>
            <section id="history">
                {items.map((item) => (
                    <div className="flex gap-2 items-center justify-start max-w-full overflow-hidden">
                        <p class="shrink-0">
                            <span className="text-[#C541F2]">guest</span> in
                            {" "}
                            <span className="text-[#41F2A9]">~</span>{" "}
                            <span className="text-[#F2BB41]">λ</span>
                        </p>
                        <span className="whitespace-nowrap max-w-full">
                            prev command: {item}
                        </span>
                    </div>
                ))}
            </section>
        </>
    );
}
