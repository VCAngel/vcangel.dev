import React, { Component } from 'react';
import axios from 'axios';
import Project from './Project';

export default class ProjectList extends Component {
    constructor(props) {
        super(props);
    }

    //TODO fetch db for projects

    render() {
        return (
            <ul>
                <li>
                    <Project />
                </li>
            </ul>
        )
    }
}