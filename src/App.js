import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LiveStreamer from "./twitchFiles/getLiveStreamer";
import ReactPlayer from "react-player";
import TenStreamers from "./twitchFiles/DisplayTwitchComponent";
import SpinningWheel from "./spinningwheel/displaycomponent";

class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      viewing: "",
      name: "",
      game: ""
    };
    this.getStreamerName = this.getStreamerName.bind(this);
    this.resetURL = this.resetURL.bind(this);
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
      <Fragment>
        <ReactPlayer url={`${this.state.url}`} />
        <h1>
          Current streamer is:
          {this.state.name}
        </h1>
        <h2>
          Game:
          {this.state.game}
        </h2>
        <h3>
          Number of viewers:
          {this.state.viewing}
        </h3>
      </Fragment>
    );
    console.log(this.state);
    return (
      <Router>
        <Fragment>
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
          <div>
            <TenStreamers />
          </div>
          <div>
            <SpinningWheel />
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default BasicExample;
