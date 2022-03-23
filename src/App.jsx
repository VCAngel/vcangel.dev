import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './ReportWebVitals';
import Navbar from './components/navbar/Navbar';
import Main from './components/main/Main';
import Contact from './components/contact/Contact';
import './scss/app.scss';

ReactDOM.render(
    <React.StrictMode>
        {/* Components in here! */}
        <Navbar></Navbar>
        <Main></Main>
        <Contact></Contact>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();