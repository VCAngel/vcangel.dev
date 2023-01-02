import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { Component, createRef } from "preact";
import { Canvas, useFrame } from "@react-three/fiber";
import { ResizeObserver as PolyFill } from "@juggle/resize-observer";

//: Islands
import TextFlicker from "../islands/TextFlicker.tsx";
// import Box from "../islands/ThreeCanvas.jsx";

//: Components
import { CustomHead } from "../components/CustomHead.tsx";
import Navbar from "../components/Navbar.tsx";

export const handler: Handlers = {
  GET(_: Request, ctx: HandlerContext) {
    const comp = (
      // <Canvas id="spaceBg" resize={{ polyfill: window.ResizeObserver || PolyFill }} style={{ position: "absolute", zIndex: -11 }} >
      //   <Box position={[1.2, 0, 0]} />
      // </Canvas>
      <div></div>
    )
    return ctx.render(comp)
  }
}

export default class Home extends Component {
  constructor(props: PageProps) {
    super(props);
    this.canvas = props.data
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
      unscrambleDelay: 80,
      scrambleDelay: 80,
      interludeDelay: 3000
    }
  }

  render() {
    return (
      <>
        <CustomHead title="Hey there!" />
        <Navbar />
        {this.canvas}
        <main className="container" id="home">
          <div className="landing">
            <h1 className="landing--name">
              <span className="color">Hey there! </span>
              <span>i'm</span>
              <br />
              Angel Vargas
            </h1>

            <section>
              <p className="landing--staticTitle">
                I'm&nbsp;
                <span className="landing--text">
                  <TextFlicker data={this.flickerProps} />
                </span>
              </p>
            </section>

            <section>
              {/*todo social links*/}
            </section>
          </div>
          <span>{/*todo threejs avatar*/}</span>
        </main>
      </>
    );
  }
}
