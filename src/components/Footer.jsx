import React from 'react';
import { ReactComponent as LinkedIn } from '../svg/linkedIn.svg';
import { ReactComponent as Github } from '../svg/github.svg';
import { ReactComponent as Platzi } from '../svg/platzi.svg';
import { ReactComponent as Twitter } from '../svg/twitter.svg';

export default function Footer() {
    return (
        <footer className="end">
            <ul className="end__socials">
                <Social social='linkedIn' />
                <Social social='github' />
                <Social social='platzi' />
                <Social social='twitter' />
            </ul>
            <p className="end__cr">©2022 Ángel Vargas</p>
            <p className="end__msg">the only limit is your imagination</p>
        </footer>
    )
}

const Social = ({ social }) => {

    const links = {
        'linkedIn': 'https://www.linkedin.com/in/vcangel/',
        'github': 'https://github.com/vcangel',
        'platzi': 'https://platzi.com/p/VCAngel/',
        'twitter': 'https://twitter.com/Dedoloco321'
    }

    const socialID = `contact_${social}`;
    let socialLink;
    for (let i = 0; i < Object.keys(links).length; i++) {
        if (Object.keys(links)[i] === social)
            socialLink = Object.values(links)[i]
    }

    const importSVG = (social) => {
        switch (social) {
            case 'linkedIn': return <LinkedIn></LinkedIn>
                break;
            case 'github': return <Github />
                break;
            case 'platzi': return <Platzi />
                break;
            case 'twitter': return <Twitter />
                break;
            default: return <span>Not a social network</span>
        }
    }

    return (
        <li>
            <a href={socialLink} title={social} target="_blank" id={socialID}>
                <div className="svgContainer">
                    {importSVG(social)}
                </div>
            </a>
        </li>
    )
}