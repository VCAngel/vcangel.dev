import React, {useState, useEffect} from 'react'

export default function TextFlicker({ list, unicode, unscrambleDelay = 50, scrambleDelay = 50, interludeDelay = 1000 }) {
    const [listItem, setListItem] = useState({
        current: list[0],
        prev: null,
    });
    const [glitchedText, setGlitchedText] = useState("");
    const [isUnscrambling, setIsUnscrambling] = useState(true);
    const [isInterlude, setIsInterlude] = useState(false);
    const [banks, setBanks] = useState({
        mainBank: [],
        helperBank: [],
    })

    let timeoutId, intervalId;

    function fillBank(text, minValue = 1, maxValue = 2) {
        minValue = minValue < 0 ? 0 : minValue;
        maxValue = maxValue < 0 ? 0 : maxValue;

        let tempBank = [];
        for (let charIndex in text) {
            tempBank[charIndex] = (Math.floor(Math.random() * ((maxValue - 1) + minValue)) + 1);
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
        for (let charIndex in banks.helperBank) {
            if (banks.helperBank[charIndex] > 0) {
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
            let mainBank = fillBank(listItem.current, 5, 10);
            let helperBank = fillBank(listItem.prev, 5, 10);
            setBanks({ mainBank: mainBank, helperBank: helperBank });

            return
        }

        if (isUnscrambling) {
            // console.log("unscrambleBank",bank);

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
            // console.log("scrambleBank:",bank);
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

            }

            return () => clearTimeout(timeoutId);
        }
    }, [listItem, glitchedText, isUnscrambling, isInterlude, banks])


    return glitchedText
}