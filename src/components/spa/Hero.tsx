import { profile } from "../../data/profile.ts";

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col items-center sm:flex-row sm:items-end gap-[3ch]"
    >
      <img
        src={profile.avatar.value}
        alt={profile.name.value}
        width="128"
        height="128"
        className="size-48 sm:size-32 rounded-[0.250rem] border border-[#cecae0]"
      />
      <div className="flex flex-col gap-[1ch] text-center sm:text-left">
        <h1 className="font-majorMonoDisplay text-4xl">{profile.name.value}</h1>
        <p className="text-gray-400 text-lg">{profile.tagline.value}</p>
      </div>
    </section>
  );
}
