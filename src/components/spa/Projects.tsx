import { projects } from "../../data/profile.ts";

const LINK_CLASSES =
  "hover:bg-[#C541F2] selection:bg-[#C541F2] text-[#C541F2] hover:text-black";

export default function Projects() {
  return (
    <section id="projects" className="flex flex-col gap-[2ch]">
      <h2 className="font-majorMonoDisplay text-2xl">Projects</h2>
      <ul className="flex flex-col gap-[2ch]">
        {projects.map((project) => (
          <li
            key={project.name}
            className="flex flex-col gap-[1ch] p-[2ch] border border-[#cecae0] rounded-sm"
          >
            <h3 className="text-indigo-400">{project.name}</h3>
            <p>{project.description}</p>
            <p className="text-gray-400">{project.stack.join(" · ")}</p>
            <p className="flex flex-wrap gap-[2ch]">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  target="_blank"
                  href={link.url}
                  className={LINK_CLASSES}
                >
                  {link.label}
                </a>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
