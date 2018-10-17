import React, { Fragment } from "react";
import "./style.css";
import TenStreamers from "./../twitchFiles/getTenStreamers";

class SpinningWheel extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.createWedges = this.createWedges.bind(this);
    this.startSpin = this.startSpin.bind(this);
    this.getWedges = this.getWedges.bind(this);
    this.state = {
      spinning: "start",
      wedges: null,
      sources: {}
    };
  }

  getWedges() {
    const streamers = new TenStreamers();
    return streamers.getTenStreams().then(payload => {
      streamers.getTenImagesAndURLS(payload);
      this.setState({ sources: streamers.imagesAndURLS });
    });
  }

  createWedges() {
    console.log("creating wedges");
    const wedges = [];
    const totalWedges = Object.keys(this.state.sources).length;
    const degree = 360 / totalWedges;
    let rotateBy = 0;
    for (let key in this.state.sources) {
      const rotation = {
        transform: `rotate(${rotateBy}deg)`
      };
      console.log(this.state.sources[key]);
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
      { spinning: "spinning", wedges: wedges },
      console.log(this.state)
    );
  }

  startSpin() {
    this.getWedges().then(() => {
      this.createWedges();
    });
  }

  render() {
    // const wedges = this.state.wedges;
    let circleColor;
    if (this.state.spinning === "start") {
      // wedges = null;
      circleColor = "circleColorBlack";
    }
    if (this.state.spinning === "spinning") {
      // wedges = this.createWedges();
      circleColor = "circleColorRed";
    }
    // console.log(wedges);
    return (
      <Fragment>
        <button className={"spinnerButton"} onClick={() => this.startSpin()}>
          Spin!
        </button>
        <div className={"positionCircle"}>
          <div className={"createCirlce"}>
            <div className={"cirlcePlacement"}>{this.state.wedges}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SpinningWheel;
