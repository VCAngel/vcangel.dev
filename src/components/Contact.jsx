import React from "react";

const Contact = () => {
    return (
        <>
            <section className="container" id="contact">
                <div className="contact__title">
                    <h2 className="contact__title--title">Let's <span>work together!</span></h2>
                    <p className="contact__title--text">
                        Got a project, inquiry or just want to say hi? Feel free to contact me! <br />
                        I'll be sure to reply ASAP.
                    </p>
                </div>

                <a className="btn btn-glow contact__button" href="mailto:vcangel00@gmail.com" target="_blank">Get in touch</a>

                <div className="contact__avatar">
                    {/*TODO avatar model and import with Three package*/}
                    <span>avatar</span>
                </div>

            </section>
        </>
    )
}

export default Contact;