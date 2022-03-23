import React, { Component } from 'react';
import * as Three from 'three';
import Blackhole from './bodies/Blackhole';

export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className='main container'>
                <Blackhole/>
            </main>
            );
    }
}