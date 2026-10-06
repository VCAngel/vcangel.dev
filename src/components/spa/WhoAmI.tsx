import { profile } from "../../data/profile.ts";

const LINK_CLASSES =
  "hover:bg-[#C541F2] selection:bg-[#C541F2] text-[#C541F2] hover:text-black";

function isStringArray(arr: unknown): arr is string[] {
  return Array.isArray(arr) && arr.every((item) => typeof item === "string");
}

export default function WhoAmI() {
  return (
    <section id="who-am-i" className="flex flex-col gap-[2ch]">
      <h2 className="font-majorMonoDisplay text-2xl">{">"} who am i</h2>
      <p>{profile.bio.value}</p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-[2ch] gap-y-[1ch]">
        <dt className="text-indigo-400">{profile.location.label}</dt>
        <dd>
          <a
            target="_blank"
            href={profile.location.href}
            className={LINK_CLASSES}
          >
            {profile.location.value}
          </a>
        </dd>
        <dt className="text-indigo-400">Interests:</dt>
        <dd>
          {isStringArray(profile.interestsSPA.value)
            ? profile.interestsSPA.value.join(", ")
            : null}
        </dd>
        <dt className="text-indigo-400">Skills:</dt>
        <dd>
          <ul className="flex flex-wrap gap-[1ch]">
            {isStringArray(profile.skillsSPA.value)
              ? profile.skillsSPA.value.map((skill) => (
                <li key={skill} className="border border-[#cecae0] px-[1ch]">
                  {skill}
                </li>
              ))
              : null}
          </ul>
        </dd>
      </dl>
    </section>
  );
}
