import React, { Fragment } from "react";
import "./style.css";

class SpinningWheel extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.sources = this.props["sources"];
    this.createWedges = this.createWedges.bind(this);
    this.state = {
      spinning: "start"
    };
  }

  createWedges() {
    console.log("creating wedges");
    const wedges = [];
    const totalWedges = Object.keys(this.sources).length;
    const degree = 360 / totalWedges;
    let rotateBy = 0;
    for (let key in this.sources) {
      const rotation = {
        transform: `rotate(${rotateBy}deg)`
      };
      console.log(this.sources[key]);
      wedges.push(
        <div key={key} style={rotation} className={`scaleDiv wedgePosition`}>
          <div className={"triangleTransform"}>
            <div>
              <img
                className={"sourceImage"}
                src={`${this.sources[`${key}`]["image"]}`}
                alt="preview"
              />
            </div>
          </div>
        </div>
      );
      rotateBy += degree;
    }
    return wedges;
  }

  render() {
    let wedges;
    let circleColor;
    if (this.state.spinning === "start") {
      wedges = this.createWedges();
      circleColor = "circleColorBlack";
    }
    if (this.state.spinning === "spinning") {
      wedges = this.createWedges();
      circleColor = "circleColorRed";
    }
    console.log(wedges);
    return (
      <Fragment>
        <button
          className={"spinnerButton"}
          onClick={() => this.setState({ spinning: "spinning" })}
        >
          Spin!
        </button>
        <div className={"positionCircle"}>
          <div className={"createCirlce"}>
            <div className={"cirlcePlacement"}>{wedges}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SpinningWheel;
