import { ITimeCounter } from "./interfaces.ts";
import { useState, useEffect } from "preact/hooks";

export default function TimerCounterComponent(props: ITimeCounter) {
	const startDate = new Date().setFullYear(2018, 7, 20);
	const currentDate = new Date();
	const currentTime = (currentDate.getHours() * 60 * 60 * 1000) + (currentDate.getMinutes() * 60 * 1000) + (currentDate.getSeconds() * 1000); // Current day time in seconds
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
			const timeDiff = getTimeDiff(startDate, currentDate, currentTime) / timeFormat;

			let newCount;
			switch (type) {
				case "seconds": {
					const secs = Math.floor(timeDiff);
					newCount = secs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
					setCounter(newCount)
					break;
				}
				default:
					newCount = timeDiff.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
					setCounter(newCount)
			}
		}, 1000);

		return () => clearInterval(intervalId);

	}, [counter, timeFormat])

	return <>
		<span>{counter} {type}</span>
	</>
}

const getTimeDiff = (date1: number, date2: Date, date2Seconds = 0) => {
	return Math.abs(date1 - (date2.getTime() + date2Seconds));
}