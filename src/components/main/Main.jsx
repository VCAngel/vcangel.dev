import React, { Component } from 'react';
import * as Three from 'three';
import Blackhole from './bodies/Blackhole';

//TODO threeJS models and scenes
//?TODO make threeJS wrapper package. Making threeJS component is a pain in the ass
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.threeContainer = React.createRef(); // <== main container
        this.initThree();
        this.meshes = {
            blackhole: undefined,
            about: undefined,
            projects: undefined,
        }
        this.state = {
            isLoading: true,
            canvasStyle: [],
            canvasDataEngine: '',
        }
    }

    initThree = () => {
        this.scene = new Three.Scene();
        this.camera = new Three.PerspectiveCamera(75, 1, 0.1, 1000);
        this.renderer = new Three.WebGLRenderer({ alpha: true });
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        //-> Animations in here!:
        this.meshes.blackhole.rotation.x += 0.01;
        this.meshes.blackhole.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
        // console.warn('test');
    }

    bodiesRender = (renderer) => {
        // console.log(renderer.domElement);
        const { domElement } = renderer;
        const data_engine = domElement.attributes[1].value;
        const style = [];
        style.push(domElement.style.width);
        style.push(domElement.style.height);
        style.push(domElement.style.display);
        this.setState({
            isLoading: false,
            canvasStyle: style,
            canvasDataEngine: data_engine
        });
    }

    createMeshes = () => {
        const geometry = new Three.SphereGeometry(5);
        const material = new Three.MeshBasicMaterial({ color: 0x0000ff });

        this.meshes.blackhole = new Three.Mesh(geometry, material);
        this.meshes.about = new Three.Mesh(geometry, material);
        this.meshes.projects = new Three.Mesh(geometry, material);

        this.scene.add(this.meshes.blackhole)
        console.log('asdasd');

        this.camera.position.setZ(5);
    }

    componentDidMount = () => {
        this.bodiesRender(this?.renderer);
    }

    render() {
        if (this.state.isLoading) {
            //! If we wanna keep app size, but lower res, do this:
            //: this.renderer.setSize(window.innerWidth/2, window.innerHeight/2, false)
            this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

            return (
                <main className='main container' ref={this?.threeContainer}>Loading...</main>
            );
        } else {
            //?

            return (
                <main className='main container' ref={this?.threeContainer} onLoad={this.createMeshes()}>
                    <canvas onLoad={this.animate()}
                        className='main__canvas'
                        style={{
                            width: this.state.canvasStyle[0],
                            height: this.state.canvasStyle[1],
                            display: this.state.canvasStyle[2]
                        }}
                        data-engine={this.state.canvasDataEngine}>
                        <Blackhole scene={this.scene} camera={this.camera} />
                    </canvas>
                </main>
            )
        }
    }
}