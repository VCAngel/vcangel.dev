import React from "react";
import Social from './Social';

const Contact = () => {
    return (
        <footer>
            <h2>Contact me!</h2>
            <h3>My email: <a href="#">vcangel00@gmail.com</a></h3>
            <ul>
                <li><Social social='LinkedIn' /></li>
                <li><Social social='Github' /></li>
                <li><Social social='Twitter' /></li>
            </ul>
        </footer>
    )
}

export default Contact;