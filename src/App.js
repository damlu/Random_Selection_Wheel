import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
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
    debugger;
    return <ReactPlayer url={`${spinResult}`} width={"inherit"} />;
  }

  render() {
    return (
      <Router>
        <Fragment>
          <SpinningWheel
            sources={this.getStreamers}
            displayResult={this.displayStream.bind(this)}
            buttonColor={"green"}
          />
        </Fragment>
      </Router>
    );
  }
}

export default BasicExample;
