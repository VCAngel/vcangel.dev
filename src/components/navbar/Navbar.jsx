import React from 'react';

const Navbar = () => {
    const links = ['Home', 'About', 'Projects', 'Contact']

    return (
        <header className="navbar">
            <div className="navbar__icon">
                <a href='#'>VA</a>
            </div>
            <ul className="navbar__links">
                {links.map((link, index) => <Navlink text={link} key={index} />)}
            </ul>
        </header>
    )
}

function Navlink({ text }) {
    return (
        <li className="navbar__links--item">
            <a href="#">{text}</a>
        </li>
    );
}

export default Navbar;