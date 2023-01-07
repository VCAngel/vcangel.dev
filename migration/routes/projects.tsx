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
		{
			title: `ClimaTS`,
			text: "Web Application that let's you find out what the weather is around the world!",
			techs: ["TypeScript", "SCSS"],
			href: "https://github.com/VCAngel/Weather_App"
		},
		{
			title: "FEMDesk",
			text: "Modular physical phenomena simulator. Utilizing the Finite Elements Method, resolves and displays physical and mathematical simulations.",
			techs: ["Python"],
			href: "https://github.com/montesp/FEMDesk"
		},
		{
			title: "Github User Search",
			text: "Web application for searching Github users and displaying general information about them. Made with the consumption of Github's public API.",
			techs: ["HTML","SCSS", "JavaScript"],
			href: "https://github.com/VCAngel/GH_User_Search"
		}
	]

	return (
		<>
			<CustomHead title="My projects!" />
			<Navbar />
			<section className="container" id="projects">
				<div className="projects">
					<h2 className="projects--title">Here's some <span>stuff I made.</span></h2>
					<p className="projects--mini">Made with love 🤍</p>
					<section className="projects__showcase">
						{cards.map((item, index) => <ProjectCard
							title={item.title}
							text={item.text}
							href={item.href}
							key={index} />)}
					</section>
				</div>

			</section>
			<script type="text/javascript" src="./js/vanilla-tilt.min.js" />
		</>
	)
}