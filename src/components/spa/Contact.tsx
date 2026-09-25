import { contacts } from "../../data/profile.ts";

const LINK_CLASSES =
  "hover:bg-[#C541F2] selection:bg-[#C541F2] text-[#C541F2] hover:text-black";

// Plain links for v1, no island: a contact form + backend is a follow-up
export default function Contact() {
  return (
    <section id="contact" className="flex flex-col gap-[2ch]">
      <h2 className="font-majorMonoDisplay text-2xl">Contact</h2>
      <ul className="flex flex-col gap-[1ch]">
        {contacts.map((channel) => (
          <li key={channel.id} className="grid grid-cols-[10ch_1fr]">
            <span className="text-indigo-400">{channel.label}</span>
            <a target="_blank" href={channel.href} className={LINK_CLASSES}>
              {channel.text}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
