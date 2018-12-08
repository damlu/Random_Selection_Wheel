import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import LiveStreamer from "./twitchFiles/getLiveStreamer";
import ReactPlayer from "react-player";
import TenStreamers from "./twitchFiles/getTenStreamers";
import SpinningWheel from "./spinningwheel/displaycomponent";

class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      viewing: "",
      name: "",
      game: "",
      wedgesSource: {},
      result: ""
    };
    this.getStreamers = this.getStreamers.bind(this);
    // this.resetState = this.resetState.bind(this);
    this.displayStream = this.displayStream.bind(this);
  }

  // componentDidMount() {
  //   this.getStreamers();
  // }

  // getStreamers() {
  //   const streamers = new TenStreamers();
  //   return streamers.getTenStreams().then(payload => {
  //     streamers.getTenImagesAndURLS(payload);
  //     this.setState({ wedgesSource: streamers.imagesAndURLS });
  //   });
  // }
  getStreamers() {
    const streamers = new TenStreamers();
    return streamers.getTenStreams().then(payload => {
      streamers.getTenImagesAndURLS(payload);
      return streamers.imagesAndURLS;
    });
  }

  // resetState() {
  //   this.setState({ url: "", wedgesSource: {} });
  // }

  displayStream(spinResult) {
    debugger;
    return <ReactPlayer url={`${spinResult}`} width={"inherit"} />;
  }

  // spinResult(spinResult) {
  //   this.setState({ url: spinResult });
  // }

  render() {
    return (
      <Router>
        <Fragment>
          <SpinningWheel
            sources={this.getStreamers}
            displayResult={this.displayStream.bind(this)}
          />
        </Fragment>
      </Router>
    );
  }
}

export default BasicExample;
