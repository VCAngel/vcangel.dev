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
            isLoading: true,
            canvasStyle: [],
            canvasDataEngine: '',
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
        console.log(domElement);
        const style = [];
        style.push(domElement.style.width);
        style.push(domElement.style.height);
        style.push(domElement.style.display);
        const data_engine = domElement.attributes[1].value;
        this.setState({
            isLoading: false,
            canvasStyle: style,
            canvasDataEngine: data_engine
        });
    }

    render() {
        //! If we wanna keep app size, but lower res, do this:
        //-> this.renderer.setSize(window.innerWidth/2, window.innerHeight/2, false)
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        if (this.state.isLoading) {
            return (
                <main className='main container' ref={this?.threeContainer}>Loading...</main>
            );
        }
        else {
            return (
                <main className='main container' ref={this?.threeContainer} onLoad={this.animate}>
                    <canvas id='threeCanvas'
                        className='main__canvas'
                        style={{
                            width: this.state.canvasStyle[0],
                            height: this.state.canvasStyle[1],
                            display: this.state.canvasStyle[2]
                        }}
                        data-engine={this.state.canvasDataEngine}>

                    </canvas>
                </main>
            )
        }
    }
}