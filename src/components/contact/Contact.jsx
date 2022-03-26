import React from "react";
import Social from './Social';

const Contact = () => {
    return (
        <footer className="contact">
            <h2 className="contact__title">Let's work together!</h2>
            <h3 className="contact__email"><a href="#">vcangel00@gmail.com</a></h3>
            <ul className="contact__socials">
                <Social social='linkedIn' />
                <Social social='github' />
                <Social social='platzi' />
                <Social social='twitter' />
            </ul>
        </footer>
    )
}

export default Contact;