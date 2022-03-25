import React, { Component, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Blackhole from './bodies/Blackhole';

//TODO threeJS models and scenes
export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className='main container' ref={this?.threeContainer}>
                <Canvas>
                    <ambientLight/>
                    <pointLight position={[10,10,10]}/>
                    <Box />
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
    //-> Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.x += 0.01))
    useFrame(() => (mesh.current.rotation.y += 0.01))

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}>
            <boxBufferGeometry args={[2, 2, 2]} />
            <meshLambertMaterial color={'hotpink'} />
        </mesh>
    )
}
