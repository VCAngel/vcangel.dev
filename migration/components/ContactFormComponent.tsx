import { IContactFormComponent } from "./interfaces.ts";

export default function ContactFormComponent({ states, formRef, sendMethod, methods }: IContactFormComponent) {
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = methods;

	// todo Modify form styles

	return (
		<div className="form card-bg">
			<form className="form__group" onSubmit={handleSubmit(sendMethod)} ref={formRef}>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" {...register("name", { required: "What's your name?" })} placeholder={errors.name?.message} />

				<label htmlFor="email">Email address</label>
				<input type="email" id="email" {...register("email", { required: "What's your email?" })} placeholder={errors.email?.message} />

				<label htmlFor="subject">Subject</label>
				<input type="text" id="subject" {...register("subject", { required: "How may I help you? :]" })} placeholder={errors.subject?.message} />

				<label htmlFor="message">Message</label>
				<textarea id="message" {...register("message", { required: 'Just say hi!' })} placeholder={errors.message?.message} cols={30} rows={8}></textarea>

				<input className="button" type="submit" value="Get in touch 🚀" />
			</form>

			{states.sent ? <p>Message sent!</p> : null}
			{states.failed ? <div>
				<p>Could not send message</p>
				<p>Try again later</p>
			</div> : null}
		</div>
	)
}