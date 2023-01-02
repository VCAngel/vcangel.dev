import { IProjectCard } from "./interfaces.ts"

// todo new card style and presentation
export default function ProjectCard({ title, text, href }: IProjectCard) {
    return (
        <div className="card-bg card"
            data-tilt
            data-tilt-max="7"
            data-tilt-glare="true"
            data-tilt-max-glare="0.05"
            data-tilt-reverse="true">
            <img src="" alt={title} className="card__img" />
            <div className="card__content" >
                <h4>{title}</h4>
                <p>{text}</p>
            </div>
            <div className="body"></div>
        </div>
    )
}