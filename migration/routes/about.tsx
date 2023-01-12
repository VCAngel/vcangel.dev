import { PageProps } from "$fresh/server.ts";

//: Islands
import TimeCounter from "../islands/TimeCounter.tsx";
import TextFlicker from "../islands/TextFlicker.tsx";

//: Components
import { CustomHead } from "../components/CustomHead.tsx";
import Navbar from "../components/Navbar.tsx";
import AboutMiniSection from "../components/AboutMiniSection.tsx";
import { VA } from "../components/SVG.jsx";

export default function About() {
	const technologies = ["HTML 5", "CSS 3", "JavaScript", "React", "Vue", "Node.js", "Python", "Java", "C#", "SQL", "Git"];
	const interests = ["GNU/Linux 🐧", "Rock/Metal 🤘", "Gaming 🎮", "Space 🌌", "Frogs 🐸"];

	const flickerProps = {
		list: [
			"developing compelling, user-friendly applications",
			"programming and everything tech",
			"turning my ideas into something helpful"
		],
		unicode: "⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠻⠕⠏⠟⠗⠎⠞⠥⠧⠺⠭⠽⠵⠸⠷⠾⠿",
		unscrambleDelay: 80,
		scrambleDelay: 80,
		interludeDelay: 7000
	}

	function getAge() {
		const bday = new Date();
		const today = new Date();
		bday.setFullYear(2000, 11, 15);

		const diffTime = Math.abs(bday - today);
		return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365))
	}

	return (
		<>
			<CustomHead title="About me!" />
			<Navbar />
			<div className="v-center">
				<section className="container" id="about">
					{/* TODO add selfie or something */}
					<div className="pfp">
						<div className="pfp__clip"
							data-tilt
							data-tilt-max="10"
							data-tilt-glare="true"
							data-tilt-reverse="true"
							data-tilt-max-glare="0.3"
							data-tilt-full-page-listening>
							<VA /> {/**Clip path */}
							<div className="pfp__clip--img">
								<span className="layer_1">&nbsp;</span>
								<span className="layer_2">&nbsp;</span>
								<span className="layer_3">&nbsp;</span>
								<span className="layer_4">&nbsp;</span>
								<span className="layer_5">&nbsp;</span>
								<img src="./img/me_woah.jpg" alt="VCAngel!" />
							</div>
						</div>
					</div>
					<div className="about">
						<h2 className="about--title">A little <span>about me!</span></h2>
						<p className="about--text">
							Hello! My name is <span>Ángel Vargas Casavantes</span>.
							<br />
							I'm a <span>{getAge()}-year-old</span> passionate <span>Computer Systems Engineer</span> based in <a href="https://www.google.com.mx/maps/place/Chihuahua,+Chih./@28.6708592,-106.2047053,11z/data=!3m1!4b1!4m5!3m4!1s0x86ea449d5d484033:0xb7f1a7a706dd1d7b!8m2!3d28.6329957!4d-106.0691004" target="_blank">Chihuahua, Mexico</a>.
							I'm currently building an application for solving heat equations using the finite element method. <br />
							For the last <TimeCounter data="years" />, I've been in love with <TextFlicker data={flickerProps} />. <br />
							Nothing's better than a cup of coffee, some tunes, and getting lost in the code.
						</p>
					</div>
					<div className="info">
						<AboutMiniSection title="Skills" className="info--techstack" list={technologies} />
						<AboutMiniSection title="Interests" className="info--interests" list={interests} />
					</div>
				</section>
			</div>
			<script src="./js/vanilla-tilt.min.js"></script>
		</>
	);
}