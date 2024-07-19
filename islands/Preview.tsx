import { asset } from "$fresh/src/runtime/utils.ts";
import { TypewriterText } from "../src/components/commands/Base.tsx";
import usePixelate from "../src/hooks/Pixelate.tsx";

export default function Preview({ className }: { className?: string }) {
  return (
    <section className={className}>
      {usePixelate(
        asset("https://avatars.githubusercontent.com/u/42756104?v=4"),
        0.0005,
        {
          canvasClassName:
            "object-contain w-auto h-[16ch] lg:h-auto lg:flex-grow lg:w-full lg:max-h-32 2xl:max-h-48",
          maxPercentage: 0.25,
        },
      )}

      <div className="border-l lg:border-b lg:border-l-0 border-slate-300 h-full lg:h-auto lg:w-full">
      </div>
      <ul class="flex flex-col overflow-y-auto hide-scrollbar max-h-[16ch] lg:max-h-full">
        <li className="text-indigo-400 selection:bg-indigo-400">
          <TypewriterText text="VCAngel@github" key="preview_vcangel" />
        </li>
        <li className="hidden lg:block">
          <TypewriterText text="- - - - - - - -" key="preview_division" />
        </li>
        <li className="inline-flex gap-[1ch] items-center">
          <span className="text-indigo-400 selection:bg-indigo-400">
            <TypewriterText text="Location:" key="preview_location" />
          </span>
          <a
            target="_blank"
            href="https://www.google.com.mx/maps/place/Chihuahua,+Chih./@28.677362,-106.22181,11z/data=!3m1!4b1!4m6!3m5!1s0x86ea449d5d484033:0xb7f1a7a706dd1d7b!8m2!3d28.6433753!4d-106.0587908!16zL20vMDFmdnpo?entry=ttu"
            className="hover:bg-[#C541F2] selection:bg-[#C541F2] text-[#C541F2] hover:text-black"
          >
            <TypewriterText
              text="Chihuahua, Mexico"
              key="preview_location_val"
            />
          </a>
        </li>
        <li className="inline-flex gap-[1ch] items-start">
          <span className="text-indigo-400 selection:bg-indigo-400">
            <TypewriterText text="OS:" key="preview_os" />
          </span>
          <span>
            <TypewriterText text="Arch Linux" key="preview_os_value" />
          </span>
        </li>
        <li className="inline-flex gap-[1ch] items-start">
          <span className="text-indigo-400 selection:bg-indigo-400">
            <TypewriterText text="Skills:" key="preview_skills" />
          </span>
          <span>
            <TypewriterText
              text="[Javascript, Typescript, Python, Java, HTML5, CSS3, Angular, React, Node.js, TailwindCSS]"
              key="preview_skills_val"
            />
          </span>
        </li>
        <li className="inline-flex gap-[1ch] items-start">
          <span className="text-indigo-400 selection:bg-indigo-400">
            <TypewriterText text="Interests:" key="preview_interests" />
          </span>
          <span>
            <TypewriterText
              text="[GNU/Linux, Rock/Metal, Gaming, Phrogs, Space]"
              key="preview_interests_val"
            />
          </span>
        </li>
        <li className="hidden lg:inline-flex gap-[1ch] items-start">
          <span className="text-indigo-400 selection:bg-indigo-400">
            <TypewriterText text="Status:" key="preview_status" />
          </span>
          <span>
            <a
              target="_blank"
              href="https://drive.google.com/file/d/150I8lteRmwdnYZAd-a6OPKhtFF2thAms/view?usp=sharing"
              className="hover:bg-[#C541F2] selection:bg-[#C541F2] text-[#C541F2] hover:text-black"
            >
              <TypewriterText
                text="𝕔𝕠𝕗𝕗𝕖𝕖 𝕥𝕚𝕞𝕖 𝕨𝕠𝕒𝕙! ☕"
                key="preview_status_val"
              />
            </a>
          </span>
        </li>
      </ul>
    </section>
  );
}
