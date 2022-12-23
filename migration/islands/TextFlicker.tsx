import { PageProps } from "$fresh/server.ts";
import { Component } from "preact";

import TextFlickerComponent from "../components/TextFlickerComponent.tsx";

interface TextFlickerProps {
    flickerProps: PageProps
}

export default class TextFlicker extends Component implements TextFlickerProps {
    flickerProps
    constructor(props: { data: PageProps }) {
        super(props);
        this.state = {
            isLoading: true,
        };
        this.flickerProps = props.data;
    }

    componentDidMount(): void {
        this.setState({
            isLoading: false
        });
    }

    render() {
        return <TextFlickerComponent data={this.flickerProps} />
    }
}