import React, { Fragment } from "react";
import "./style.css";
import TenStreamers from "./../twitchFiles/getTenStreamers";
// import ReactTimeout from "react-timeout";

class SpinningWheel extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.createWedges = this.createWedges.bind(this);
    this.startSpin = this.startSpin.bind(this);
    this.getWedges = this.getWedges.bind(this);
    // this.stopSpin = this.stopSpin.bind(this);
    this.state = {
      spinning: "start",
      wedges: null,
      sources: {},
      degree: 0,
      spinBy: 0,
      result: "",
      rotations: this.props.rotations * 360
    };
  }

  getWedges() {
    const streamers = new TenStreamers();
    return streamers.getTenStreams().then(payload => {
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
      if (degree * selected - 36 < 0) {
        return 0;
      } else {
        return -(degree * selected - 36);
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
    this.setState(
      {
        spinning: "spinning",
        wedges: wedges,
        result: result,
        spinBy: spinBy() + this.state.rotations
      }
      // console.log(this.state)
    );

    return Promise.resolve("Success");
  }

  startSpin() {
    this.setState({ spinning: "stopped" });
    this.getWedges().then(() => {
      this.createWedges();
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
      // const selected = Math.floor(Math.random() * this.state.wedges.length);
      // const spinBy = this.state.degree * selected;
      // console.log(`${this.state.degree} degree`);
      // console.log(`${this.state.result} this.state.result`);
      // console.log(`${this.state.spinBy} spinBy`);
      // console.log(this.state.wedges.length);
      circleColor = "circleAttrubutesRed";
      spinner = {
        animation: "spin 5s",
        transform: `translate(-50%, 0%) rotate(${this.state.spinBy}deg)`
      };
    }
    if (this.state.spinning === "stopped") {
      circleColor = "circleAttrubutesRed";
    }
    return (
      <Fragment>
        <div>
          <div className={"pointer"} />
          <button className={"spinnerButton"} onClick={() => this.startSpin()}>
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

// spin = { "clip-path": "polygon(50% 100%, 18% 0%, 82% 0%)" };
