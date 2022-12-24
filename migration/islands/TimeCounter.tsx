import { ITimeCounter } from "../components/interfaces.ts";
import { PageProps } from "$fresh/server.ts";
import { Component } from "preact";

import TimeCounterComponent from "../components/TimeCounterComponent.tsx"

export default class Timecounter extends Component implements ITimeCounter {
	type;

	constructor(props: PageProps) {
		super(props);
		this.type = props.data;
	}

	render() {
		return (
			<TimeCounterComponent type={this.type} />
		)
	}
}