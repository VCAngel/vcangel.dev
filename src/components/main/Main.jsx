import React, { Component, Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Stars } from '@react-three/drei';
import Frog from './bodies/Frog';
import Blackhole from './bodies/Blackhole';
import About from './bodies/About';
import ProjectList from './bodies/ProjectList';

//TODO threeJS models and scenes
//TODO Creating groups and making the solar system structure
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
        this.texts = [
            'a Software Developer 💻',
            'a UI/UX Designer 🖌',
            'an Open Source Enthusiast 🐧',
            'a Coffee Enjoyer ☕',
            'becoming my best self 🙇',
            'a 3D model?... Woah! 👌',
        ]
        this.textSpan = React.createRef();
        this.controls = React.createRef();
        this.system = {
            group: React.createRef(),
            earth: React.createRef(),
            moon: React.createRef(),
            ship: React.createRef(),
        }
    }

    componentDidMount() {
        this.setState({ isLoading: false });
    }

    renderTextFlicker() {
        if (this.state.isLoading) {
            return "nothing yet :c";
        }

        return <TextFlicker list={this.texts}
            unicode={"⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠻⠕⠏⠟⠗⠎⠞⠥⠧⠺⠭⠽⠵⠸⠷⠾⠿"}
            unscrambleDelay={50}
            scrambleDelay={50}
            interludeDelay={3000} />
    }

    render() {
        return (
            <main className="container" id="home" ref={this?.threeContainer}>
                {/* TODO Rotating titles */}
                <div className='landing'>
                    <h1 className='landing--name'>
                        <span className="color">Hey there.</span><span> i'm</span><br />
                        Angel Vargas
                    </h1>

                    <section>

                        <p className='landing--staticTitle'>I'm&nbsp;
                            <span className='landing--text' ref={this.textSpan}>
                                {this.renderTextFlicker()}
                            </span>
                        </p>
                    </section>

                    <h4 className='landing__resume'>Check out my
                        <a className="landing__resume--button" href="#">resume</a>
                    </h4>
                </div>
                <span>THREEJS</span>
            </main>
        )

    }
}

function TextFlicker({ list, unicode, unscrambleDelay = 50, scrambleDelay = 50, interludeDelay = 1000 }) {
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

const System = (props) => {
    return (
        <Canvas className='main__canvas' camera={{ fov: 75, near: 0.1, far: 1000 }} >
            <ambientLight intensity={1} />
            <h1>asd</h1>
            <pointLight position={[0, 0, 10]} />
            <pointLight position={[0, 0, -10]} />
            {/* <OrbitControls autoRotateSpeed={0.5} enableZoom={true} ref={this.controls} /> */}
            <Stars radius={100} fade />
            <Suspense fallback={null}>
                <group ref={this.system.group}>
                    <Frog body={this.system.earth} controls={this.controls} type='earth' scale={1} position={[0, 0, 0]} />
                    <Frog body={this.system.moon} type='moon' scale={0.25} position={[20, 0, 0]} />
                    <Frog body={this.system.ship} type='ship' scale={0.15} position={[8, 0, 0]} />
                </group>
            </Suspense>
            {/* <About /> */}
            {/* <ProjectList /> */}
        </Canvas>
    );
}

const Box = (props) => {
    //-> This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [active, setActive] = useState(false)
    const [hovered, setHovered] = useState(false)
    //-> Rotate mesh every frame, this is outside of React without overhead
    // useFrame(() => (mesh.current.rotation.x += 0.01))
    // useFrame(() => (mesh.current.rotation.y += 0.01))

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerEnter={event => setHovered(!hovered)}
            onPointerLeave={event => setHovered(!hovered)}>
            <boxBufferGeometry args={[2, 2, 2]} />
            <meshLambertMaterial color={hovered ? 'blue' : 'hotpink'} />
        </mesh>
    )
}
