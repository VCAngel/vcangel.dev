import React, { useRef } from "react";
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

                <a className="btn btn-glow contact__button" href="mailto:vcangel00@gmail.com" target="_blank">Get in touch</a>
            </div>

            <Form />

        </section>
    )
}

function Form() {
    const form = useRef();
    console.log(form.current );
    const sendEmail = (evt) => {
        emailjs.sendForm('service_2czw83q', 'template_eh9d3ka', form.current, 'vzqY23Ajs9q6rGrTi')
        .then(res => {
            console.log("Message sent! :] Status:", res.status);
        }, err => {
            console.error("Message could not be sent :[" ,err);
        })
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    // todo reCAPTCHA
    // todo display failed/sent message card

    return (
        <form className="form" onSubmit={handleSubmit(sendEmail)} ref={form}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" {...register("name", { required: "What's your name?" })} placeholder={errors.name?.message} />

            <label htmlFor="email">Email address</label>
            <input type="email" id="email" {...register("email", { required: "What's your email?" })} placeholder={errors.email?.message} />

            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" {...register("subject", { required: "How may I help you? :]" })} placeholder={errors.subject?.message} />

            <label htmlFor="message">Message</label>
            <textarea id="message" {...register("message", { required: 'Just say hi!' })} placeholder={errors.message?.message} cols="30" rows="10"></textarea>

            <input type="submit" value="Send message 🚀"/>
            
        </form>
    )
}

export default Contact;