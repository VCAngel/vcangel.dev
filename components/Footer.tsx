//: Components
import { ISocial } from "./interfaces.ts";
import { LinkedIn, Github, Platzi, Twitter } from "./SVG.jsx";

export default function Footer() {
    return (
        <footer>
            <div className="end container">
                <p className="end__msg">the only limit is your imagination</p>
                <ul className="end__socials">
                    <Social social='linkedIn' link="https://www.linkedin.com/in/vcangel/" />
                    <Social social='github' link="https://github.com/vcangel" />
                    {/* <Social social='platzi' link="https://platzi.com/p/VCAngel/" /> */}
                    {/* <Social social='twitter' link="https://twitter.com/Dedoloco321" /> */}
                </ul>
            </div>
        </footer>
    )
}

const Social = ({ social, link }: ISocial) => {

    const socialID = `contact_${social}`;

    const importSVG = (social: string) => {
        switch (social) {
            case 'linkedIn': return <LinkedIn />
            case 'github': return <Github />
            case 'platzi': return <Platzi />
            case 'twitter': return <Twitter />
            default: return <span>Not a social network</span>
        }
    }

    return (
        <li>
            <a href={link} title={social} target="_blank" id={socialID}>
                <div className="svgContainer">
                    {importSVG(social)}
                </div>
            </a>
        </li>
    )
}