import { PageProps } from "$fresh/server.ts";

export interface IAboutMiniSection {
	title: string;
	list: string[];
	className: string;
}

export interface ITimeCounter {
	type: string;
}

export interface ITimeCounterComponent extends ITimeCounter{
	data: {
		startDate: number;
		currentDate: Date;
		currentTime: number;
	}
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