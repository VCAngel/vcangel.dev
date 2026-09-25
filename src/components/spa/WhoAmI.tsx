import { profile } from "../../data/profile.ts";

const LINK_CLASSES =
  "hover:bg-[#C541F2] selection:bg-[#C541F2] text-[#C541F2] hover:text-black";

export default function WhoAmI() {
  return (
    <section id="who-am-i" className="flex flex-col gap-[2ch]">
      <h2 className="font-majorMonoDisplay text-2xl">Who Am I</h2>
      <p>{profile.bio}</p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-[2ch] gap-y-[1ch]">
        <dt className="text-indigo-400">Location</dt>
        <dd>
          <a
            target="_blank"
            href={profile.location.href}
            className={LINK_CLASSES}
          >
            {profile.location.text}
          </a>
        </dd>
        <dt className="text-indigo-400">Interests</dt>
        <dd>{profile.interests.join(", ")}</dd>
        <dt className="text-indigo-400">Skills</dt>
        <dd>
          <ul className="flex flex-wrap gap-[1ch]">
            {profile.skills.map((skill) => (
              <li key={skill} className="border border-[#cecae0] px-[1ch]">
                {skill}
              </li>
            ))}
          </ul>
        </dd>
      </dl>
    </section>
  );
}
