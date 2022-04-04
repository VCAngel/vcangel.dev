import React, { Component, Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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
        this.system = {
            group: React.createRef(),
            earth: React.createRef(),
            moon: React.createRef(),
            ship: React.createRef(),
        }
    }

    render() {

        return (
            <main className='main' ref={this?.threeContainer}>
                <Canvas className='main__canvas' camera={{ fov: 75, near: 0.1, far: 1000 }}>
                    <ambientLight intensity={1} />
                    <pointLight position={[10, 10, 10]} />
                    <OrbitControls autoRotateSpeed={0.5} enableZoom={true} />
                    <Stars radius={100} fade />
                    <Suspense fallback={null}>
                        <group ref={this.system.group}>
                            <Frog body={this.system.earth} type='earth' scale={0.1} position={[0, 0, 0]} />
                            <Frog body={this.system.moon} type='moon' scale={0.025} position={[30, 0, 0]} />
                            <Frog body={this.system.ship} type='ship' scale={0.015} position={[13, 0, 0]} />
                        </group>
                    </Suspense>
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
