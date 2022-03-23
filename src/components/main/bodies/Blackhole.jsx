import React, { Component } from 'react';
import Projects from './ProjectList';
import About from './About';

export default class Blackhole extends Component {
    constructor(props) {
        super(props);
        this.initGeometry(this?.props?.Three)
    }

    initGeometry = (Three) => {
        const geometry = new Three.BoxGeometry();
        const material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new Three.Mesh(geometry, material);
        this.props.scene.add(cube)

        this.props.camera.position.z = 10;
    }

    render() {
        return (
            <div className="">
                <h1>Blackhole</h1>
                <Projects />
                <About />
            </div>
        )

    }
}