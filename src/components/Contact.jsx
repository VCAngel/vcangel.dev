import React, { useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import emailjs from "@emailjs/browser";

const Contact = () => {
    return (
        <section className="container" id="contact">
            <div className="contact">

                <div className="contact__title">
                    <h2 className="contact__title--title">Let's <span>work together!</span></h2>
                    <p className="contact__title--text">
                        Got a project, inquiry or just want to say hi? Feel free to contact me! <br />
                        I'll be sure to reply ASAP.
                    </p>
                </div>
            </div>

            <Form />

        </section>
    )
}

function Form() {
    const [sent, isSending] = useState(false);
    const [failed, hasFailed] = useState(false);
    const form = useRef();
    const sendEmail = async (evt) => {
        isSending(true);

        await emailjs.sendForm('service_2czw83q', 'template_eh9d3ka', form.current, 'vzqY23Ajs9q6rGrTi')
            .then(res => {
                console.log("Message sent! :] Status:", res.status);
            }, err => {
                console.error("Message could not be sent :[...", err);
                useState(true);
            })
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    // todo reCAPTCHA

    return (
        <div className="form">
            <form className="form__group" onSubmit={handleSubmit(sendEmail)} ref={form}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" {...register("name", { required: "What's your name?" })} placeholder={errors.name?.message} />

                <label htmlFor="email">Email address</label>
                <input type="email" id="email" {...register("email", { required: "What's your email?" })} placeholder={errors.email?.message} />

                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" {...register("subject", { required: "How may I help you? :]" })} placeholder={errors.subject?.message} />

                <label htmlFor="message">Message</label>
                <textarea id="message" {...register("message", { required: 'Just say hi!' })} placeholder={errors.message?.message} cols="30" rows="8"></textarea>

                <div className="g-recaptcha" data-sitekey="6LfZQZwhAAAAAP2TRBL4OThYgIPSeMllM2sOXI67"></div>
                <input className="button" type="submit" value="Get in touch 🚀" />
            </form>

            {sent ? <p>Message sent!</p> : null}
            {failed ? <div>
                <p>Could not send message</p>
                <p>Try again later</p>
            </div> : null}
        </div>
    )
}

export default Contact;