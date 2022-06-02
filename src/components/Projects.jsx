import React from 'react';

export default function Projects(props) {
    const cards = [
        { title: "CIMAV", text: "Heat Equation calculator. Uses Finite Element Method for displaying results through an assigned model.", href: "https://github.com/" },
        { title: `House's Community`, text: "CRUD Application for resident management in a housing estate.", href: "https://github.com/VCAngel/House_Community" },
        { title: "Github User Search", text: "Web application that consumes Github's API. Displays searched user's information", href: "https://github.com/VCAngel/GH_User_Search" }
    ]

    return (
        <section className="container" id="projects">
            <div className="projects">
                <h2 className="projects--title">Here's some <span>stuff I made.</span></h2>
                <p className="projects--mini">Made with care 🤍</p>
                <div className="projects__showcase">
                    {cards.map((item, index) => <ProjectCard title={item.title}
                        text={item.text}
                        href={item.href}
                        key={index} />)}
                </div>
            </div>
        </section>
    )
}

function ProjectCard({ title, text, href }) {
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