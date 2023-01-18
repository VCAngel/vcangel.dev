import { Ref, useState, useEffect } from "preact/hooks";
import { IProjectCard } from "./interfaces.ts"

// todo new card style and presentation
export default function ProjectCard({ title, text, imgSrc, href }: IProjectCard) {
    return (
        <div className="card-bg card"
            data-tilt
            data-tilt-max="7"
            data-tilt-glare="true"
            data-tilt-max-glare="0.05"
            data-tilt-reverse="true">
            <img src={imgSrc} alt={title} className="card__img" />
            <div className="card__content">
                <div>
                    <h4 className="card__content--title">{title}</h4>
                    <p className="card__content--desc">{text}</p>
                    <a className="card__content--button" href={href} target="_blank">Source code</a>
                </div>
            </div>
        </div>
    )
}