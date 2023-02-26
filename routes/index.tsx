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
import Footer from "../components/Footer.tsx";

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
        "a Coffee Junkie ☕",
        "a Rock/Metal Enjoyer 🤘🎸",
        "working to become my best self 🙇",
        "a 3D model?... Woah! 😳",
        "this guy! ☝️",
        "an arch user btw 🤓",
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
        <div id="spaceBg" style={{position: "absolute", zIndex: -11}}/>
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
          </div>
          {/* ?todo threejs avatar */}
          
        </main>
        <Footer />
      </>
    );
  }
}
