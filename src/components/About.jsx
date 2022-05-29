import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ConvexPolyhedronArgs } from '@react-three/cannon';

export default function About() {
    const technologies = ["HTML 5", "CSS 3", "JavaScript", "React", "Node.js", "Python", "Java", "SQL"];
    const otherTechs = ["Git", "SASS", "Bootstrap", "Figma"];
    const interests = ["GNU/Linux", "Rock/Metal", "Gaming", "Cats"];

    function getAge() {
        const bday = new Date();
        const today = new Date();
        bday.setFullYear(2000, 10, 15);

        const diffTime = Math.abs(bday - today);
        return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365))
    }

    return (
        <section className="container">
            <div className="about">
                <h2 className="about--title">Hello there!</h2>
                <div className="about__info">
                    <p className="about__info--text">
                        I'm <b>Ángel Vargas</b>, a <span>{getAge()}</span> year old passionate <i>Computer Systems Engineer</i> from Mexico. <br />
                        I've been learning and developing code for the last <TimeCounter type="seconds"/> seconds!... or about <TimeCounter type="years"/> years. <br />

                        Building all kinds of high quality <span></span>applications is what I do and I'm always up for a challenge!
                    </p>
                    <div className="about__info--techstack">
                        <AboutMiniSection title="Technologies" list={technologies} />
                        <AboutMiniSection title="Others" list={otherTechs} />
                    </div>
                    <div className="about__info--interests">
                        <AboutMiniSection title="interests" list={interests} />
                    </div>
                </div>
            </div>
        </section>
    );
}

function AboutMiniSection({ title = [], list = [] }) {
    const items = list.map((item, index) => <li key={index}>{item}</li>)

    return (
        <section>
            <h5>{title}</h5>
            <ul>
                {items}
            </ul>
        </section>
    );
}

function TimeCounter({type}) {
    const [counter, setCounter] = useState(0);
    const [isFormatted, setIsFormatted] = useState(false);
    const startDate = new Date().setFullYear(2018, 7, 20);
    const currentDate = new Date();
    let timeFormat, timeDiff;

    const Timer = () => {
        let intervalId;

        useEffect(() => {
            if (!isFormatted) {
                switch (type) {
                    case "seconds":
                        timeFormat = (1000)
                        break;
                    case "minutes":
                        timeFormat = (1000 * 60)
                        break;
                    case "hours":
                        timeFormat = (1000 * 60 * 60)
                        break;
                    case "days":
                        timeFormat = (1000 * 60 * 60 * 24)
                        break;
                    case "years":
                        timeFormat = (1000 * 60 * 60 * 24 * 365)
                        break;
                    default:
                        timeFormat = 1000;
                }
                timeDiff = Math.abs(startDate - currentDate);
                setIsFormatted(true)
                setCounter(timeDiff / timeFormat);
            }

            intervalId = setInterval(() => {
                if (isFormatted)
                    setCounter(counter => counter + 1)
            }, 1000);

            return () => clearInterval(intervalId);

        }, [isFormatted, counter])

        return <span>{counter}</span>
    }

    return <Timer />
}