import { PageProps } from "$fresh/server.ts";
import { StateUpdater, MutableRef } from "preact/hooks";
import { UseFormReturn } from "react-hook-form";

export interface IAboutMiniSection {
	title: string;
	list: string[];
	className: string;
}

export interface ITimeCounter {
	type: string;
}

export interface ITextFlicker {
	flickerProps: PageProps
}

export interface ITextFlickerComponent {
	list: [string];
	unicode: string;
	unscrambleDelay: number;
	scrambleDelay: number;
	interludeDelay: number;
}

export interface IProjectCard {
	title: string;
	text: string;
	href: string;
}

export interface IContactFormComponent {
	states: {
		sent: boolean, 
		failed: boolean
	}
	formRef: MutableRef<undefined>,
	sendMethod: () => Promise<void>,
	methods: UseFormReturn
}