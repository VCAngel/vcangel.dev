import React, {useRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {Stars} from '@react-three/drei';
import ReactDOM from 'react-dom';
import reportWebVitals from './ReportWebVitals';
import Navbar from './components/Navbar';
import Main from './components/main/Main';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/contact/Contact';
import './scss/app.scss';

ReactDOM.render(
    <React.StrictMode>
        <Canvas id="spaceBg" style={{position: "absolute", zIndex: -11}}>
            {/* <RotatingStars/> */}
        </Canvas>
        <Navbar></Navbar>
        <Main></Main>
        <About />
        <Projects />
        <Contact></Contact>
    </React.StrictMode>,
    document.getElementById('root')
);

function RotatingStars(props){
    const stars = useRef();
    useFrame((state, delta) => stars.current.rotation.y += 0.01 * delta)

    return(
        <Stars ref={stars} fade depth={50}/>
    )
}

reportWebVitals();