import React, { Component, Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
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
            'an Open Source Enjoyer 🐧',
            'a Coffee Junkie ☕',
            'becoming my best self 🤘',
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

        return <TextFlicker list={this.texts} element={this.textSpan} delay={100} />
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

                        <p className='landing--staticTitle'>I'm
                            <span className='landing--text' ref={this.textSpan}>&nbsp;
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

function TextFlicker({ list, element, delay }) {
    const [currentItem, setCurrentItem] = useState(list[0]);
    const [glitchedText, setGlitchedText] = useState(currentItem);
    const [bank, setBank] = useState([])
    const [isMixing, setIsMixing] = useState(false);
    const unicode = "!$0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";

    let timeOutId;

    function initComponent() {
        let tempBank = [];
        for (let charIndex in currentItem) {
            tempBank[charIndex] = (Math.floor(Math.random() * (unicode.length / 3 - 1 + 1)) + 1);
        }
        setBank(tempBank);
        mixText(isMixing);
    }

    function randomCharacter() {
        return unicode[Math.floor(Math.random() * unicode.length)]
    }
    function replaceAt(text, character, index) {
        return text.substring(0, index) + character + text.substring(index + character.length);
    }

    function mixText(isMixing) {
        let keepMixing = isMixing;
        for (let charIndex in currentItem) {
            if (bank[charIndex] != 0) {
                keepMixing = true

                if (currentItem[charIndex] != " ") {
                    setGlitchedText(glitchedText => replaceAt(glitchedText, randomCharacter(), charIndex));
                } else {
                    setGlitchedText(glitchedText => glitchedText = replaceAt(glitchedText, " ", charIndex));
                }
                bank[charIndex]--;
            } else {
                if (glitchedText != currentItem)
                    setGlitchedText(glitchedText => glitchedText = replaceAt(glitchedText, currentItem[charIndex], charIndex));
                console.log(bank);
            }
        }

        if (keepMixing)
            setIsMixing(true)

    }

    useEffect(() => {
        if (isMixing) {
            timeOutId = setTimeout(() => {
                mixText(isMixing)
            }, delay)

            return () => clearTimeout(timeOutId);

        }
    }, [glitchedText])


    if (bank.length == 0)
        initComponent()

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
