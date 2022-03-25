import React, { Component } from 'react';
import { Canvas } from '@react-three/fiber';

export default class Blackhole extends Component {
    constructor(props) {
        super(props);
        this.initGeometry();
    }

    initGeometry() {
        //-> This ref will give us direct access to the mesh
        this.mesh = React.createRef();
    }

    render() {
        return (
            <mesh
                ref={this.mesh}>
                <sphereBufferGeometry args={[2]} />
                <meshLambertMaterial color={'white'}/>
            </mesh>
        )

    }
}