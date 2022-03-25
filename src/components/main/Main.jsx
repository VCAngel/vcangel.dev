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
            canvasAttrs: []
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
        const attributes = []
        for (let i = 0; i < domElement.attributes.length; i++) {
            if (i == 0)
                continue;
            else
                attributes.push(domElement.attributes[i])
        }
        attributes.unshift(domElement.style.height)
        attributes.unshift(domElement.style.width)
        this.setState({ canvasAttrs: attributes })
    }

    render() {
        //! If we wanna keep app size, but lower res, do this:
        //-> this.renderer.setSize(window.innerWidth/2, window.innerHeight/2, false)
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        if (this.state.canvasAttrs.length == 0) {
            return (
                <main className='main container' ref={this?.threeContainer}>Loading...</main>
            );
        }
        else {
            console.log(this.state)
            return (
                //TODO correct canvas attrs
                <main className='main container' ref={this?.threeContainer} onLoad={this.animate}>
                    <canvas id='threeCanvas'
                        className='main__canvas'
                        style={{ width: this.state.canvasAttrs[0], height: this.state.canvasAttrs[1] }}
                        data-engine={this.state.canvasAttrs[2].value}
                        width={this.state.canvasAttrs[3]}
                        height={this.state.canvasAttrs[4]}></canvas>
                </main>
            )
        }
    }
}

// //? ThreeJS canvas wrapper class
// const Bodies = (attrs, parentNodeRef) => {
//     const cvsAttrs = [['style', attrs[0]], ['data-engine', attrs[1]], ['width', attrs[2]], ['height', attrs[3]]];
//     const canvas = document.createElement('canvas');
//     canvas.id = 'threeCanvas';
//     canvas.className = 'main__canvas'
//     cvsAttrs.forEach(attr => {
//         canvas.setAttribute(attr[0], attr[1].value)
//     })
//     // console.warn(canvas)
//     console.warn(parentNodeRef)
//     return <div ref={(current => {
//         parentNodeRef.current.appendChild(canvas);
//         current.remove
//     })}></div>
// }