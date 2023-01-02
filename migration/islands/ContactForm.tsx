import { useState, useRef } from 'preact/hooks';
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

//: Components
import ContactFormComponent from '../components/ContactFormComponent.tsx';

export default function ContactForm() {
	const [sent, isSending] = useState(false);
	const [failed, _hasFailed] = useState(false);

	const form = useRef();
	const sendEmail = async () => {
		isSending(true);

		await emailjs.sendForm('service_2czw83q', 'template_eh9d3ka', form.current, 'vzqY23Ajs9q6rGrTi')
			.then(res => {
				console.log("Message sent! :] Status:", res.status);
			}, err => {
				console.error("Message could not be sent :[...", err);
				useState(true);
			})
	}

	const methods = useForm();

	return <ContactFormComponent
		states={{ sent, failed }}
		formRef={form}
		sendMethod={sendEmail}
		methods={methods} />
}