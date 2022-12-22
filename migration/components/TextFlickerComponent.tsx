import { useState, useEffect } from 'preact/hooks';

interface TextFlickerProps {
	list: [string];
	unicode: string;
	unscrambleDelay: number;
	scrambleDelay: number;
	interludeDelay: number;
}

export default function TextFlickerComponent(props: { data: TextFlickerProps }) {
	const { list, unicode, unscrambleDelay = 50, scrambleDelay = 50, interludeDelay = 1000 } = props.data;
	const [listItem, setListItem] = useState({
		current: list[0],
		prev: "",
	});
	const [glitchedText, setGlitchedText] = useState("");
	const [isUnscrambling, setIsUnscrambling] = useState(true);
	const [isInterlude, setIsInterlude] = useState(false);
	const [banks, setBanks] = useState({
		mainBank: [],
		helperBank: [],
	})

	let timeoutId: number, intervalId;

	function fillBank(text, minValue = 1, maxValue = 2) {
		minValue = minValue < 0 ? 0 : minValue;
		maxValue = maxValue < 0 ? 0 : maxValue;

		let tempBank = [];
		for (const charIndex in text) {
			tempBank[charIndex] = (Math.ceil(Math.random() * ((maxValue - minValue + 1)) + minValue));
		}
		return tempBank;
	}

	function randomCharacter() {
		return unicode[Math.floor(Math.random() * unicode.length)]
	}

	function replaceAt(text, character, index) {
		return text.substring(0, index) + character + text.substring(index + character.length);
	}

	function unscramble() {
		for (let charIndex in listItem.current) {
			if (banks.mainBank[charIndex] != 0) {

				if (listItem.current[charIndex] != " ") {
					setGlitchedText(glitchedText => replaceAt(glitchedText, randomCharacter(), charIndex));
				} else {
					setGlitchedText(glitchedText => replaceAt(glitchedText, " ", charIndex));
				}
				banks.mainBank[charIndex]--;
			} else {
				setGlitchedText(glitchedText => replaceAt(glitchedText, listItem.current[charIndex], charIndex));
			}
		}

		return isUnscrambling;
	}

	function scramble(prevArray, targetArray) {
		const isNotZero = (val: number) => val != 0;
		if (banks.helperBank.every(isNotZero)) {
			// Reduce all values in helperBank recursively until at least one is 0
			for (const charIndex in banks.helperBank) {
				banks.helperBank[charIndex]--;
			}
			scramble(prevArray, targetArray)
			return
		}

		for (const charIndex in banks.helperBank) {
			if (isNotZero(banks.helperBank[charIndex])) {
                setGlitchedText(glitchedText => replaceAt(glitchedText, prevArray[charIndex], charIndex));

				banks.helperBank[charIndex]--;
			} else {
				setGlitchedText(glitchedText => replaceAt(glitchedText, randomCharacter(), charIndex));
			}
		}

		if (banks.helperBank[banks.helperBank.length - 1] == 0) {

			if (prevArray.length > targetArray.length) {
				let slice = prevArray.slice(0, prevArray.length - 1)
				let helper = banks.helperBank;

				helper.pop()
				setListItem({ current: targetArray, prev: slice })
				setBanks(obj => ({ mainBank: obj.mainBank, helperBank: helper }))
			}

			if (prevArray.length < targetArray.length) {
				let concat = prevArray.concat(" ");
				let helper = banks.helperBank;
				helper.push(1);
				setListItem({ current: targetArray, prev: concat })
			}

		}
	}

	useEffect(() => {
		if (banks.mainBank.length == 0) {
			let mainBank = fillBank(listItem.current, 5, 15);
			let helperBank = fillBank(listItem.prev, 5, 15);
			setBanks({ mainBank: mainBank, helperBank: helperBank });

			return
		}

		if (isUnscrambling) {

			timeoutId = setTimeout(() => {
				if (glitchedText != listItem.current) {
					setIsUnscrambling(unscramble())
				} else {
					let nextItemIndex = list.indexOf(listItem.current) + 1;
					if (nextItemIndex == list.length)
						nextItemIndex = 0

					setListItem(obj => ({
						current: list[nextItemIndex],
						prev: obj.current
					}));

					setBanks({ mainBank: [], helperBank: [] })
					setIsUnscrambling(false)
					setIsInterlude(true);
				}
			}, unscrambleDelay)

			return () => clearTimeout(timeoutId);

		} else {

			if (isInterlude) {
				setTimeout(() => {
					setIsInterlude(false);
				}, interludeDelay)
			} else {

				timeoutId = setTimeout(() => {
					scramble(listItem.prev, listItem.current)


					if ((listItem.prev.length == listItem.current.length) && banks.helperBank.every(val => val == 0)) {

						setBanks({ mainBank: [], helperBank: [] });
						setIsUnscrambling(true);
					}
				}, scrambleDelay)

				return () => clearTimeout(timeoutId);
			}

		}
	}, [listItem, glitchedText, isUnscrambling, isInterlude, banks])

	return <span>{glitchedText}</span>
}