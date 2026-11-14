import { projects } from "../../data/profile.ts";
import { PROJECT_KINDS } from "../../models/project.model.ts";
import ProjectGallery from "./ProjectGallery.tsx";

const LINK_CLASSES =
  "hover:bg-[#C541F2] selection:bg-[#C541F2] text-[#C541F2] hover:text-black";

// NOTE: Zero-JS filter: radios + `:has()` hide rules in app.css
const filters = [
  { kind: "all", count: projects.length },
  ...PROJECT_KINDS
    .map((kind) => ({
      kind,
      count: projects.filter((project) => project.kind === kind).length,
    }))
    .filter(({ count }) => count > 0),
];

export default function Projects() {
  return (
    <section id="projects" className="flex flex-col gap-[2ch]">
      <h2 className="font-majorMonoDisplay text-2xl">{">"} projects</h2>
      {filters.length > 2
        ? (
          <fieldset className="project-filter flex flex-wrap gap-[1ch]">
            <legend className="sr-only">Filter projects by kind</legend>
            {filters.map(({ kind, count }) => (
              <label key={kind}>
                <input
                  type="radio"
                  name="project-kind"
                  value={kind}
                  checked={kind === "all"}
                  className="sr-only"
                />
                {kind} ({count})
              </label>
            ))}
          </fieldset>
        )
        : null}
      <ul className="flex flex-col gap-[2ch]">
        {projects.map((project, index) => (
          <li
            key={project.name}
            data-kind={project.kind}
            className="flex flex-col gap-[1ch] p-[2ch] border border-[#cecae0] rounded-[0.250rem]"
          >
            <h3 className="whitespace-pre-wrap">
              <span className="text-indigo-400">{project.name}</span>
              {" | "}
              <span className="text-gray-400">
                {project.kind}
                {project.role ? ` · ${project.role}` : ""}
              </span>
            </h3>
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
            {project.images?.length
              ? (
                <ProjectGallery
                  images={project.images}
                  projectName={project.name}
                  idPrefix={`project-${index}`}
                />
              )
              : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
