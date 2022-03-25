import React, { Component } from 'react';
import Projects from './ProjectList';
import About from './About';

export default class Blackhole extends Component {
    constructor(props) {
        super(props);
        this.initGeometry(this?.props?.Three)
    }

    render() {
        return (
            <div className={this?.props?.class} >
                <h1>Blackhole</h1>
                <Projects />
                <About />
            </div>
        )

    }
}