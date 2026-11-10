import { ProjectImage } from "../../models/project.model.ts";
import { projectImage } from "../../utils/images.ts";

const BUTTON_CLASSES =
  "hover:bg-[#C541F2] selection:bg-[#C541F2] text-[#C541F2] hover:text-black px-[0.5ch] text-2xl";

/** Zero-JS gallery: each thumbnail opens its own native popover */
export default function ProjectGallery({
  images,
  projectName,
  idPrefix,
}: {
  images: ProjectImage[];
  projectName: string;
  idPrefix: string;
}) {
  return (
    <ul className="flex gap-[2ch] overflow-x-auto snap-x snap-mandatory pb-[1ch] [scrollbar-width:thin]">
      {images.map((image, index) => {
        const id = `${idPrefix}-img-${index}`;
        const { thumb, full } = projectImage(image.name);
        const position = `${index + 1}/${images.length}`;

        return (
          <li key={image.name} className="shrink-0 snap-start">
            <button
              type="button"
              popovertarget={id}
              title={`View ${image.alt}`}
              className="block overflow-hidden rounded-[0.125rem] border border-[#cecae0] cursor-zoom-in hover:border-[#C541F2] focus-visible:outline-2 focus-visible:outline-[#C541F2] focus-visible:outline-offset-2"
            >
              <img
                src={thumb}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="block h-[12ch] w-auto aspect-[16/10] object-cover"
              />
            </button>
            <div
              id={id}
              popover="auto"
              aria-label={`${projectName} screenshot ${position}`}
              className="lightbox"
            >
              <img src={full} alt={image.alt} loading="lazy" decoding="async" />
              <p className="flex items-center gap-[2ch] pt-[1ch]">
                <span className="grow">{image.alt}</span>
                <span className="text-gray-400">{position}</span>
                <button
                  type="button"
                  popovertarget={id}
                  popovertargetaction="hide"
                  aria-label="Close"
                  className={BUTTON_CLASSES}
                >
                  ×
                </button>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
