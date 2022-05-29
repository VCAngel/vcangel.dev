import React from 'react';
import jump from 'jump.js';

const Navbar = () => {
    const links = ['Home', 'About', 'Projects', 'Contact']

    return (
        <header className="navbar">
            <div className="navbar__icon">
                <a href='#' onClick={() => jumpTo('#home')}>VA</a>
            </div>
            <ul className="navbar__links">
                {links.map((link, index) => <Navlink text={link} key={index} />)}
            </ul>
        </header>
    )
}

function Navlink({ text }) {


    const jumpId = text.toLowerCase();
    return (
        <li className="navbar__links--item">
            <a href="#" onClick={() => jumpTo(`#${jumpId}`)}>{text}</a>
        </li>
    );
}

function jumpTo(target = "") {
    jump(target, {
        duration: 800,
        callback: undefined,
        a11y: true
    })
}

export default Navbar;