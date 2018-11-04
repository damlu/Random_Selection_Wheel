import React, { Fragment } from "react";
import "./style.css";
import TenStreamers from "./../twitchFiles/getTenStreamers";

class SpinningWheel extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.createWedges = this.createWedges.bind(this);
    this.startSpin = this.startSpin.bind(this);
    this.getStreamers = this.getStreamers.bind(this);
    this.state = {
      spinning: "start",
      wedges: null,
      sources: {},
      degree: 0,
      spinBy: 0,
      result: "",
      rotations: this.props.rotations * 360,
      displayResult: false
    };
  }

  getStreamers() {
    const streamers = new TenStreamers();
    return streamers.getTenStreams().then(payload => {
      console.log(payload);
      streamers.getTenImagesAndURLS(payload);
      this.setState({ sources: streamers.imagesAndURLS, spinning: "start" });
    });
  }

  createWedges() {
    console.log("creating wedges");
    const wedges = [];
    const totalWedges = Object.keys(this.state.sources).length;
    const degree = 360 / totalWedges;
    let rotateBy = 0;
    const selected = Math.floor(Math.random() * totalWedges);
    const spinBy = () => {
      if (degree * selected - degree < 0) {
        return 0;
      } else {
        return -(degree * selected - degree);
      }
    };
    let result;
    console.log(`${selected} selected`);
    console.log(`${spinBy()} spinBy`);
    for (let key in this.state.sources) {
      const rotation = {
        transform: `rotate(${rotateBy}deg)`
      };
      if (key == selected || (selected == 0 && key == 1)) {
        console.log(`${key} key`);
        console.log(this.state.sources[key]["URL"]);
        result = this.state.sources[key]["URL"];
      }

      wedges.push(
        <div key={key} style={rotation} className={`scaleDiv wedgePosition`}>
          <div className={"triangleTransform"}>
            <div>
              <img
                className={"sourceImage"}
                src={`${this.state.sources[`${key}`]["image"]}`}
                alt="preview"
              />
            </div>
          </div>
        </div>
      );
      rotateBy += degree;
    }
    this.setState({
      spinning: "spinning",
      wedges: wedges,
      result: result,
      spinBy: spinBy() + this.state.rotations
    });
    this.props.passBackResult(this.state.result);
    return Promise.resolve("Success");
  }

  startSpin() {
    this.setState({ spinning: "stopped", displayResult: false });
    this.getStreamers().then(() => {
      this.createWedges().then(() => {
        setTimeout(() => {
          this.setState({ displayResult: true }, console.log(this));
        }, 5000);
      });
    });
  }

  render() {
    let circleColor;
    let spinner;
    if (this.state.spinning === "start") {
      circleColor = "positionCircleBlack";
      spinner = null;
    }
    if (this.state.spinning === "spinning") {
      circleColor = "circleAttrubutesRed";
      spinner = {
        animation: "spin 5s",
        transform: `translate(-50%, 0%) rotate(${this.state.spinBy}deg)`
      };
    }
    if (this.state.spinning === "stopped") {
      circleColor = "circleAttrubutesRed";
    }
    console.log(this.state.displayResult);
    const displayResult = this.state.displayResult
      ? this.props.displayResult()
      : null;
    // const spin = { "clipPath": "polygon(50% 100%, 18% 0%, 82% 0%)" };
    // console.log("displayResult" + displayResult);
    const abs = { position: "absolute" };
    const rel = { position: "relative" };
    return (
      <Fragment>
        <div className={"min"}>
          <div className={"displayResult"}>{displayResult}</div>
          <div style={rel} className={"pointer"} />
          <button
            style={rel}
            className={"spinnerButton"}
            onClick={() => this.startSpin()}
          >
            Spin!
          </button>
          <div style={spinner} className={circleColor}>
            <div className={"createCirlce"}>
              <div className={"cirlcePlacement"}>{this.state.wedges}</div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SpinningWheel;

// const spin = { "clipPath": "polygon(50% 100%, 18% 0%, 82% 0%)" };
