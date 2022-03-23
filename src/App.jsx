import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './ReportWebVitals';
import Navbar from './components/navbar/Navbar';
import Main from './components/main/Main';
import './styles/app.scss';

ReactDOM.render(
    <React.StrictMode>
        {/* Components in here! */}
        <Navbar></Navbar>
        <Main></Main>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();