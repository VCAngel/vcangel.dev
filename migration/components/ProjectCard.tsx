import { IProjectCard } from "./interfaces.ts"

// todo new card style and presentation
export default function ProjectCard({ title, text, href }: IProjectCard) {
    return (
        <div className="projects__showcase--card">
            <div className="content">
                <h3 className="title">{title}</h3>
                <p className="text">{text}</p>
                <a className="btn btn-glow" href={href} target="_blank">Source Code</a>
            </div>
        </div>
    )
}