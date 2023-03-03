import { PageProps } from "$fresh/server.ts";
import { IProjectCard } from "../components/interfaces.ts";

//: Components
import { CustomHead } from "../components/CustomHead.tsx";
import Navbar from "../components/Navbar.tsx";
import ProjectCard from "../components/ProjectCard.tsx";
import Footer from "../components/Footer.tsx";
import TextFlicker from "../islands/TextFlicker.tsx";

//todo apply handler for project fetching
//? create api route

export default function Projects(props: PageProps) {
	const cards: IProjectCard[] = [
		{
			title: `JS Chess`,
			text: "Play some chess against a (not so optimized) Computer Player on the web! Improve your skills with general and technical information displayed.",
			techs: ["JavaScript", "SCSS"],
			imgSrc: "./img/chess.png",
			href: "https://github.com/VCAngel/js_chess"
		},
		{
			title: "FEMDesk",
			text: "Modular physical phenomena simulator. Utilizing the Finite Elements Method, resolves and displays physical and mathematical simulations.",
			techs: ["Python"],
			imgSrc: "./img/femdesk.png",
			href: "https://github.com/montesp/FEMDesk"
		},
		{
			title: "Github User Search",
			text: "Web application for searching Github users and displaying general information about them. Made with the consumption of Github's public API.",
			techs: ["HTML", "SCSS", "JavaScript"],
			imgSrc: "./img/ghus.png",
			href: "https://github.com/VCAngel/GH_User_Search"
		}
	]

	const flickerProps = {
		list: [
			"love 🤍",
			"care 🤍",
			"passion 🤍",
			"devotion 🤍",
			"sentiment 🤍",
			"sweat and tears 😭"
		],
		unicode: "⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠻⠕⠏⠟⠗⠎⠞⠥⠧⠺⠭⠽⠵⠸⠷⠾⠿",
		unscrambleDelay: 100,
		scrambleDelay: 100,
		interludeDelay: 3000
	}

	return (
		<>
			<CustomHead title="My projects!" />
			<Navbar />
			<div id="spaceBg" style={{ position: "absolute", zIndex: -11 }} />
			<div className="v-center">
				<section className="container" id="projects">
					<div className="projects">
						<h2 className="projects--title">Here's some <span>stuff I made.</span></h2>
						<p className="projects--mini">Made with <span className="emphasize-text"><TextFlicker data={flickerProps} /></span></p>
						<section className="projects__showcase">
							{cards.map((item, index) => <ProjectCard
								title={item.title}
								text={item.text}
								href={item.href}
								imgSrc={item.imgSrc}
								key={index} />)}
						</section>
					</div>

				</section>
			</div>
			<Footer />
			<script type="text/javascript" src="./js/vanilla-tilt.min.js" />
		</>
	)
}