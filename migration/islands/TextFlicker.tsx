import { PageProps } from "$fresh/server.ts";
import { Component } from "preact";

import TextFlickerComponent from "../components/TextFlickerComponent.tsx";

export default class TextFlicker extends Component {
    constructor(props: { data: PageProps }) {
        super(props);
        this.state = {
            isLoading: true,
            flickerProps: props.data
        };
    }

    componentDidMount(): void {
        this.setState({
            isLoading: false
        });
    }

    render() {
        return <TextFlickerComponent data={this.state.flickerProps} />
    }
}