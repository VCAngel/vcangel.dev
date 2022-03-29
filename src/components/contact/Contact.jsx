import React from "react";
import Social from './Social';

const Contact = () => {
    return (
        <footer className="container">
            <section className="contact">
                <div className="contact__title">
                    <h2 className="contact__title--title">Let's work <span>together!</span></h2>
                    <p className="contact__title--text">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Impedit atque nihil, cumque iure ipsa perferendis adipisci voluptates
                        quisquam recusandae consequuntur eveniet rem. Cumque veritatis voluptatem
                        voluptate. Vero soluta cumque maxime!
                    </p>
                </div>

                <button className="btn contact__button">Get in touch</button>

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
                <p className="end__cr">© 2022 Angel Vargas</p>
                <p className="end__msg">the only limit is your imagination</p>
            </section>
        </footer>
    )
}

export default Contact;