import React, { Component } from 'react';
import * as Three from 'three';
import Blackhole from './bodies/Blackhole';

//TODO threeJS models and scenes
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.threeContainer = React.createRef(); // <== main container
        this.initThree();
        this.state = {
            isLoading: true
        }
    }

    initThree = () => {
        this.scene = new Three.Scene();
        this.camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1);
        this.renderer = new Three.WebGLRenderer();
    }

    animate() {
        requestAnimationFrame(animate);
        this.renderer.render(this.scene, this.camera);
    }

    componentDidMount = () => {
        this.bodiesRender(this?.renderer, this?.threeContainer)
    }

    bodiesRender = (renderer, ref) => {
        const { domElement } = renderer;
        console.log(renderer);

        domElement.id = 'threeCanvas'
        domElement.className = 'main__canvas'
        ref.current.appendChild(domElement)
        // let canvas = document.createElement('canvas')
        //TODO CREATE COMPONENT FOR CANVAS WITH document.createElement
    }

    render() {
        //! If we wanna keep app size, but lower res, do this:
        //-> this.renderer.setSize(window.innerWidth/2, window.innerHeight/2, false)
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        return (
            <main className='main container' ref={this?.threeContainer} onLoad={this.animate}>
            </main>
        );
    }
}