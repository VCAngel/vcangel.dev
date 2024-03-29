const Navbar = () => {
	const links = ['About', 'Projects', 'Contact']

	return (
		<header>
			<div className="navbar container">
				<div className="navbar__icon">
					<a href='/' onClick={() => console.log("home")}>VA</a>
				</div>
				<ul className="navbar__links">
					<li className="navbar__links--item">
						<a
							target="_blank"
							href="https://drive.google.com/file/d/1Vi25kKB6tjF77eY-m9L12IVCSseEafjH/view?usp=sharing">
							Resume</a>
					</li>

					<span></span>

					{links.map((link, index) => <Navlink text={link} key={index} />)}
				</ul>
			</div>
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