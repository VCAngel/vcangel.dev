import { PageProps } from "$fresh/server.ts";
import { IProjectCard } from "../components/interfaces.ts";

//: Components
import { CustomHead } from "../components/CustomHead.tsx";
import Navbar from "../components/Navbar.tsx";
import ProjectCard from "../components/ProjectCard.tsx";

//todo apply handler for project fetching
//? create api route

export default function Projects(props: PageProps) {
	const cards: IProjectCard[] = [
		{ title: "Finite Element", text: "Heat Equation calculator. Uses Finite Element Method for displaying results through an assigned model.", href: "https://github.com/" },
		{ title: `House's Community`, text: "CRUD Application for resident management in a housing estate.", href: "https://github.com/VCAngel/House_Community" },
		{ title: "Github User Search", text: "Web application that consumes Github's API. Displays searched user's information", href: "https://github.com/VCAngel/GH_User_Search" }
	]

	return (
		<>
			<CustomHead title="My projects!" />
			<Navbar />
			<section className="container" id="projects">
				<div className="projects">
					<h2 className="projects--title">Here's some <span>stuff I made.</span></h2>
					<p className="projects--mini">Made with love 🤍</p>
					<div className="projects__showcase">
						{cards.map((item, index) => <ProjectCard
							title={item.title}
							text={item.text}
							href={item.href}
							key={index} />)}
					</div>
				</div>
			</section>
		</>
	)
}