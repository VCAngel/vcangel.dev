import { IProjectCard } from "./interfaces.ts"

// todo new card style and presentation
export default function ProjectCard({ title, text, href }: IProjectCard) {
    return (
        <div className="card-bg card" >
            <img src="" alt={title} className="card__img" />
            <div className="card__content">
                <h4>{title}</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto hic sequi rerum quaerat? Quidem consequatur neque, veritatis modi repellendus facilis eligendi ducimus. Ipsa, beatae accusantium? Mollitia placeat voluptatum consequatur aspernatur!</p>
            </div>
            <div className="body"></div>
        </div>
    )
}