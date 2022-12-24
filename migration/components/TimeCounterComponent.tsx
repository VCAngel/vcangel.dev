import { PageProps } from "$fresh/server.ts";
import { useState, useEffect } from "preact/hooks";

interface ITimeCounterComponent {
	data: {
		startDate: number;
		currentDate: Date;
		currentTime: number;
	}
	type: string;
}

export default function TimerCounterComponent(props: ITimeCounterComponent) {
	const { startDate, currentTime, currentDate } = props.data;
	const type = props.type;
	const [counter, setCounter] = useState("Infinity");
	const [timeFormat, setTimeFormat] = useState(0);
	const [isFormatted, setIsFormatted] = useState(false);

	let intervalId: number;

	useEffect(() => {
		if (!isFormatted) {
			let computed;
			switch (type) {
				case "seconds":
					computed = 1000
					setTimeFormat(computed)
					break;
				case "minutes":
					computed = 1000 * 60
					setTimeFormat(computed)
					break;
				case "hours":
					computed = 1000 * 60 * 60
					setTimeFormat(computed)
					break;
				case "days":
					computed = 1000 * 60 * 60 * 24
					setTimeFormat(computed)
					break;
				case "years":
					computed = 1000 * 60 * 60 * 24 * 365
					setTimeFormat(computed)
					break;
				default:
					computed = 1000
					setTimeFormat(computed)
			}
			setIsFormatted(true)
		}

		intervalId = setInterval(() => {
			let timeDiff = getTimeDiff(startDate, currentDate, currentTime) / timeFormat;
			console.log(timeDiff)
			let newCount;
			switch (type) {
				case "seconds":
					newCount = timeDiff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
					setCounter(newCount)
					break;
				default:
					newCount = timeDiff.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
					setCounter(newCount)
			}
		}, 1000);

		return () => clearInterval(intervalId);

	}, [counter])

	return <>
		<span>{counter} {type}</span>
	</>
}

const getTimeDiff = (date1: number, date2: Date, date2Seconds = 0) => {
	return Math.abs(date1 - (date2.getTime() + date2Seconds));
}