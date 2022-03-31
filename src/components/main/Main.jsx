import React, { Component, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Blackhole from './bodies/Blackhole';
import About from './bodies/About';
import ProjectList from './bodies/ProjectList';

//TODO threeJS models and scenes
//TODO Creating groups and making the solar system structure
export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className='main' ref={this?.threeContainer}>
                <Canvas className='main__canvas' camera={{fov: 90, near: 0.1, far: 1000}}>
                    <Stars radius={100} fade/>
                    <OrbitControls />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Blackhole />
                    {/* <About /> */}
                    {/* <ProjectList /> */}
                </Canvas>
            </main>
        )
    }
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
