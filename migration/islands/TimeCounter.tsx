import { ITimeCounter } from "../components/interfaces.ts";
import { PageProps } from "$fresh/server.ts";
import { Component } from "preact";

import TimeCounterComponent from "../components/TimeCounterComponent.tsx"



export default class Timecounter extends Component implements ITimeCounter {
	type;

	constructor(props: ITimeCounter) {
		super(props);
		this.type = props.type;
	}

	render() {
		const startDate = new Date().setFullYear(2018, 7, 20);
		const currentDate = new Date();
		const currentTime = (currentDate.getHours() * 60 * 60 * 1000) + (currentDate.getMinutes() * 60 * 1000) + (currentDate.getSeconds() * 1000); // Current day time in seconds

		const data = {
			startDate: startDate,
			currentDate: currentDate,
            currentTime: currentTime
		}

		return (
			<TimeCounterComponent data={data} type={this.type} />
		)
	}
}