import React, { Component } from 'react';
import { Canvas } from '@react-three/fiber';

const Blackhole = () => {

    const mesh = React.createRef()

    return (
        <mesh
            ref={mesh}>
            <sphereBufferGeometry args={[2]} />
            <meshLambertMaterial color={'#ff0'} />
        </mesh>
    )
}

export default Blackhole;