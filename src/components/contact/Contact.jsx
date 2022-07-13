import React from "react";
import Social from './Social';

const Contact = () => {
    return (
        <footer className="container" id="contact">
            <section className="contact">
                <div className="contact__title">
                    <h2 className="contact__title--title">Let's <span>work together!</span></h2>
                    <p className="contact__title--text">
                        Got a project, inquiry or just want to say hi? Feel free to contact me! <br/>
                        I'll be sure to reply ASAP.
                    </p>
                </div>

                <a className="btn btn-glow contact__button" href="mailto:vcangel00@gmail.com" target="_blank">Get in touch</a>

                <div className="contact__avatar">
                    {/*TODO avatar model and import with Three package*/}
                    <span>avatar</span>
                </div>

            </section>

            <section className="end">
                <ul className="end__socials">
                    <Social social='linkedIn' />
                    <Social social='github' />
                    <Social social='platzi' />
                    <Social social='twitter' />
                </ul>
                <p className="end__cr">©2022 Ángel Vargas</p>
                <p className="end__msg">the only limit is your imagination</p>
            </section>
        </footer>
    )
}

export default Contact;