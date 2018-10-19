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
  //
  // getWedges() {
  //   const streamers = new TenStreamers();
  //   streamers.getTenStreams().then(payload => {
  //     streamers.getTenImagesAndURLS(payload);
  //     this.setState({ wedgesSource: streamers.imagesAndURLS });
  //   });
  // }
  //
  // componentDidMount() {
  //   this.getWedges();
  // }

  displayStream() {
    return (
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
  }

  spinResult(spinResult) {
    this.setState({ result: spinResult });
  }

  render() {
    const Home = () => (
      <div>
        <h2>Home</h2>
      </div>
    );

    // const wheel = this.state.wedgesSource[1] ? <SpinningWheel /> : null;

    // console.log(wheel);
    const video = !this.state.url ? null : this.displayStream();
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={Home} />
          <button
            type="submit"
            onClick={e => {
              e.preventDefault();
              this.resetState();
              this.getStreamerName();
            }}
          >
            RandoStream
          </button>
          {video}

          <SpinningWheel rotations={8} />
        </Fragment>
      </Router>
    );
  }
}

export default BasicExample;
