import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactPlayer from "react-player";
import TenStreamers from "./twitchFiles/getTenStreamers";
import SpinningWheel from "./spinningwheel/displayComponent";

class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      viewing: "",
      name: "",
      game: "",
      wedgesSource: {},
      result: "",
      testFiles: {
        "1": {
          image: "./test_images/Anybots_robot_monty.jpg",
          result: "./test_images/Anybots_robot_monty.jpg"
        },
        "2": {
          image: "./test_images/costume-head-horn-908686.jpg",
          result: "./test_images/costume-head-horn-908686.jpg"
        },
        "3": {
          image: "./test_images/step_6.jpg",
          result: "./test_images/step_6.jpg"
        }
        // "4": {
        //   image: "./test_images/step_6.jpg",
        //   result: "./test_images/step_6.jpg"
        // },
        // "5": {
        //   image: "./test_images/step_6.jpg",
        //   result: "./test_images/step_6.jpg"
        // },
        // "6": {
        //   image: "./test_images/step_6.jpg",
        //   result: "./test_images/step_6.jpg"
        // },
        // "7": {
        //   image: "./test_images/step_6.jpg",
        //   result: "./test_images/step_6.jpg"
        // },
        // "8": {
        //   image: "./test_images/step_6.jpg",
        //   result: "./test_images/step_6.jpg"
        // },
        // "9": {
        //   image: "./test_images/step_6.jpg",
        //   result: "./test_images/step_6.jpg"
        // },
        // "10": {
        //   image: "./test_images/step_6.jpg",
        //   result: "./test_images/step_6.jpg"
        // }
      }
    };
    this.getStreamers = this.getStreamers.bind(this);
    this.displayStream = this.displayStream.bind(this);
  }

  getStreamers() {
    const streamers = new TenStreamers();
    return streamers.getTenStreams().then(payload => {
      streamers.getTenImagesAndURLS(payload);
      return streamers.imagesAndURLS;
    });
  }

  displayStream(spinResult) {
    return <ReactPlayer url={`${spinResult}`} width={"inherit"} />;
  }

  display(spinResult) {
    return <img src={`${spinResult}`} alt="result" />;
  }

  render() {
    debugger;
    return (
      <Router>
        <Fragment>
          <SpinningWheel
            sources={this.getStreamers}
            displayResult={this.displayStream.bind(this)}
            buttonColor={"orange"}
            backgroundStart={"black"}
            backgroundSpinning={"orange"}
            outerRingColor={"white"}
            numberOfSources={3}
            fadeInTime={1}
            durationOfSpin={5}
            rotations={30}
            showWedges={false}
          />
        </Fragment>
      </Router>
    );
  }
}

export default BasicExample;
