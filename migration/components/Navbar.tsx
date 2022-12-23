import { PageProps } from "$fresh/server.ts";

const Navbar = () => {
	const links = ['About', 'Projects', 'Contact']

	return (
		<header className="navbar">
			<div className="navbar__icon">
				<a href='/' onClick={() => console.log("home")}>VA</a>
			</div>
			<ul className="navbar__links">
				<li className="navbar__links--item">
					<a href="#">Resume</a>
				</li>

				<span></span>

				{links.map((link, index) => <Navlink text={link} key={index} />)}
			</ul>
		</header>
	)
}

function Navlink(props: { text: string }) {
	const { text } = props;
	const link = text.toLowerCase();
	return (
		<li className="navbar__links--item">
			<a href={link} onClick={() => console.log(text)}>{text}</a>
		</li>
	);
}

export default Navbar;