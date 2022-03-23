import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './ReportWebVitals';
import './styles/app.scss';
import Test from './components/Test'

ReactDOM.render(
    <React.StrictMode>
        {/* Components in here! */}
        <Test></Test>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();