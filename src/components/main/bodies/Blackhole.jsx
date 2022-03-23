import React, { Component} from 'react';
import Projects from './ProjectList';
import About from './About';

export default class Blackhole extends Component {
     constructor(props) {
         super(props);
     }

    render() {
        return(
            <div>
                <h1>Blackhole</h1>
                <Projects/>
                <About/>
            </div>
        )
    }
}