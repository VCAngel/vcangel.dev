import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './ReportWebVitals';
import SpaceBg from './img/spaceBg.jpg';
import Navbar from './components/Navbar';
import Main from './components/main/Main';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/contact/Contact';
import './scss/app.scss';

ReactDOM.render(
    <React.StrictMode>
        {/* Components in here! */}
        <img src={SpaceBg} alt="spaceWoah" id="spaceBg" />
        <Navbar></Navbar>
        <Main></Main>
        <About />
        <Projects />
        <Contact></Contact>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();