import { PageProps } from "$fresh/server.ts";

//: Islands
import ContactForm from "../islands/ContactForm.tsx";

//: Components
import { CustomHead } from "../components/CustomHead.tsx";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

// todo Add social icons

export default function Contact(props: PageProps) {
	return (
		<>
			<CustomHead title="Get in touch!" />
			<Navbar />
			<div id="spaceBg" style={{position: "absolute", zIndex: -11}}/>
			<div className="v-center">
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
					<ContactForm />
				</section>
			</div>
			<Footer />
		</>
	)
}