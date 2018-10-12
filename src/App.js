import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LiveStreamer from "./twitchFiles/getLiveStreamer";
import ReactPlayer from "react-player";

// <ReactTwitchEmbedVideo channel="talk2megooseman" />

class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "" };
    this.getStreamerName = this.getStreamerName.bind(this);
    this.resetURL = this.resetURL.bind(this);
  }

  getStreamerName() {
    const streamer = new LiveStreamer();
    streamer.getStreamerInfo().then((payload, streamer) => {
      console.log(payload.channel.url);
      this.setState({ url: payload.channel.url }, console.log("state set"));
    });
  }
  resetURL() {
    this.setState({ url: "" });
  }

  render() {
    const Home = () => (
      <div>
        <h2>Home</h2>
      </div>
    );

    const video = !this.state.url ? null : (
      <ReactPlayer url={`${this.state.url}`} />
    );
    console.log(this.state.url);
    return (
      <Router>
        <div>
          <hr />

          <Route exact path="/" component={Home} />

          <button
            type="submit"
            onClick={e => {
              e.preventDefault();
              this.resetURL();
              this.getStreamerName();
            }}
          >
            RandoStream
          </button>
          {video}
        </div>
      </Router>
    );
  }
}

export default BasicExample;
