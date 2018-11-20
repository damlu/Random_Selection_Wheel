import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LiveStreamer from "./twitchFiles/getLiveStreamer";
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
    this.getStreamerName = this.getStreamerName.bind(this);
    this.resetState = this.resetState.bind(this);
    // this.getWedges = this.getWedges.bind(this);
    this.displayStream = this.displayStream.bind(this);
  }

  getStreamerName() {
    const streamer = new LiveStreamer();
    streamer.getStreamerInfo().then((payload, streamer) => {
      console.log(payload.channel.url);
      this.setState(
        {
          url: payload.channel.url,
          name: payload.channel.display_name,
          game: payload.game,
          viewing: payload.viewers
        },
        console.log("state set")
      );
    });
  }
  resetState() {
    this.setState({ url: "", wedgesSource: {} });
  }

  displayStream() {
    return <ReactPlayer url={`${this.state.url}`} width={"inherit"} />;
  }

  spinResult(spinResult) {
    this.setState({ url: spinResult });
  }

  render() {
    const Home = () => (
      <div>
        <h2>Home</h2>
      </div>
    );

    // const video = !this.state.url ? null : this.displayStream();
    return (
      <Router>
        <Fragment>
          <SpinningWheel
            displayResult={this.displayStream.bind(this)}
            rotations={8}
            passBackResult={this.spinResult.bind(this)}
          />
        </Fragment>
      </Router>
    );
  }
}

export default BasicExample;
