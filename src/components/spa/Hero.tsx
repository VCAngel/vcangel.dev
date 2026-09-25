import { profile } from "../../data/profile.ts";

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col sm:flex-row items-center gap-[3ch]"
    >
      <img
        src={profile.avatar}
        alt={profile.name}
        width="128"
        height="128"
        className="size-32 rounded-full border border-[#cecae0]"
      />
      <div className="flex flex-col gap-[1ch] text-center sm:text-left">
        <h1 className="font-majorMonoDisplay text-4xl">{profile.name}</h1>
        <p className="text-gray-400">{profile.tagline}</p>
      </div>
    </section>
  );
}
