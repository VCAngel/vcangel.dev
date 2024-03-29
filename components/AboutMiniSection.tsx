import { IAboutMiniSection } from "./interfaces.ts";

export default function AboutMiniSection({title, list, className}: IAboutMiniSection) {
	const items = list.map((item, index) => <li key={index}>{item}</li>)

	return (
		<section>
			<h5>{title}</h5>
			<ul className={className}>
				{items}
			</ul>
		</section>
	);
}