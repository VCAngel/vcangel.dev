import usePixelate from "../src/hooks/Pixelate.tsx";

export default function Preview({ className }: { className?: string }) {
  return (
    <section className={className}>
      {usePixelate(
        "https://avatars.githubusercontent.com/u/42756104?v=4",
        0.0005,
        {
          canvasClassName:
            "object-contain w-auto h-auto lg:flex-grow lg:w-full lg:h-auto lg:max-h-48 2xl:max-h-64",
          maxPercentage: 0.25,
        },
      )}

      <div className="border-l lg:border-b lg:border-l-0 border-slate-300 h-full lg:h-auto lg:w-full">
      </div>
      <div className="whitespace-pre-wrap">
        {/* TODO Add info component */}
        About me!
      </div>
    </section>
  );
}
