import { PageProps } from "$fresh/server.ts";
import { Component, createRef } from "preact";

//: Islands
import TextFlicker from "../islands/TextFlicker.tsx";

//: Components
import { CustomHead } from "../components/CustomHead.tsx";

export default class Home extends Component {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.flickerProps = {
      list: [
        "a Software Developer 💻",
        "a UI/UX Designer 🖌",
        "an Open Source Enthusiast 🐧",
        "a Coffee Enjoyer ☕",
        "becoming my best self 🙇",
        "a 3D model?... Woah! 👌",
      ],
      unicode: "⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠻⠕⠏⠟⠗⠎⠞⠥⠧⠺⠭⠽⠵⠸⠷⠾⠿",
      unscrambleDelay: 100,
      scrambleDelay: 100,
      interludeDelay: 3000
    }
    this.textSpan = createRef();
    this.controls = createRef();
    this.system = {
      group: createRef(),
      earth: createRef(),
      moon: createRef(),
      ship: createRef(),
    };
  }

  render() {
    return (
      <>
        <CustomHead />
        <main className="container" id="home" ref={this?.threeContainer}>
          <div className="landing">
            <h1 className="landing--name">
              <span className="color">Hey there!</span>
              <span>i'm</span>
              <br />
              Angel Vargas
            </h1>

            <section>
              <p className="landing--staticTitle">
                I'm&nbsp;
                <span className="landing--text" ref={this?.textSpan}>
                  <TextFlicker data={this.flickerProps} />
                </span>
              </p>
            </section>
          </div>
          {/* Todo threejs stuff */}
          <span>THREEJS</span>
        </main>
      </>
    );
  }
}
