import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ConvexPolyhedronArgs } from '@react-three/cannon';

export default function About() {
    const technologies = ["HTML 5", "CSS 3", "JavaScript", "React", "Vue", "Node.js", "Python", "Java", "C#", "SQL", "Git"];
    const interests = ["GNU/Linux 🐧", "Rock/Metal 🤘", "Gaming 🎮", "Space 🌌", "Frogs 🐸"];

    function getAge() {
        const bday = new Date();
        const today = new Date();
        bday.setFullYear(2000, 10, 15);

        const diffTime = Math.abs(bday - today);
        return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365))
    }

    return (
        <section className="container" id="about">
            {/* TODO add selfie or something */}
            <div>
                photo!
            </div>
            <div className="about">
                <h2 className="about--title">A little <span>about me!</span></h2>
                <p className="about--text">
                    Hello! My name is <span>Ángel Vargas Casavantes</span>.
                    <br />
                    I'm a <span>{getAge()}-year-old</span> passionate <span>Computer Systems Engineer</span> based in Chihuahua.
                    I'm currently building an application for solving heat equations using the finite element method. <br />
                    For the last <TimeCounter type="years" />, I've been in love with <span>turning my ideas into user-friendly applications.</span> <br />
                    Nothing's better than a cup of coffee, some tunes, and getting lost in the code.
                </p>
            </div>
            <div className="info">
                <AboutMiniSection title="Skills" className="info--techstack" list={technologies} />
                <AboutMiniSection title="Interests" className="info--interests" list={interests} />
            </div>
        </section>
    );
}

function AboutMiniSection({ title = [], list = [], className = "" }) {
    const items = list.map((item, index) => <li key={index}>{item}</li>)

    return (
        <section>
            <h5>{title}</h5>
            <ul className={className}>
                {items}
            </ul>
        </section>
    );
}

function TimeCounter({ type }) {
    const [counter, setCounter] = useState(Infinity);
    const [timeFormat, setTimeFormat] = useState(0);
    const [isFormatted, setIsFormatted] = useState(false);
    const startDate = new Date().setFullYear(2018, 7, 20);
    const currentDate = new Date();
    const currentTime = (currentDate.getHours() * 60 * 60 * 1000) + (currentDate.getMinutes() * 60 * 1000) + (currentDate.getSeconds() * 1000); // Current day time in seconds

    const getTimeDiff = (date1, date2, date2Seconds = 0) => {
        return Math.abs(date1 - (date2.getTime() + date2Seconds));
    }

    const Timer = () => {
        let intervalId;

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

        return <React.Fragment>
            <span>{counter} {type}</span>
        </React.Fragment>
    }

    return <Timer />
}