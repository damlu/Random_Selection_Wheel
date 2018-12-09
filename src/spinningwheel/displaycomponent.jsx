import React, { Fragment } from "react";
import "./style.css";
// import TenStreamers from "./../twitchFiles/getTenStreamers";

class SpinningWheel extends React.Component {
  constructor(props) {
    super(props);
    this.createWedges = this.createWedges.bind(this);
    this.startSpin = this.startSpin.bind(this);
    this.state = {
      sources: this.props.sources,
      numberOfSources: this.props.numberOfSources || 10,
      rotations: (this.props.rotations || 8) * 360,
      revalTime: this.props.revalTime || 5000,
      backgroundStart: this.props.backgroundStart,
      backgroundSpinning: this.props.backgroundSpinning,
      outerRingColor: this.props.outerRingColor,
      buttonColor: this.props.buttonColor,
      spinning: "start",
      wedges: null,
      wedgeSources: {},
      degree: 0,
      spinBy: 0,
      result: "",
      displayResult: false,
      disableButton: false
    };
  }

  componentDidMount() {
    console.log("hey");
    if (typeof this.state.sources === "function") {
      this.getWedges();
    } else {
      let sources = this.state.sources;
      let currentValues = Object.values(sources);
      if (currentValues.length < this.state.numberOfSources) {
        sources = this.properNumberOfSources(currentValues);
      } else this.setState({ wedgeSources: sources });
    }
  }

  properNumberOfSources(sources) {
    let currentValues = Object.values(sources);
    while (currentValues.length < this.state.numberOfSources) {
      currentValues = [...currentValues, ...currentValues];
    }
    currentValues = currentValues.slice(0, this.state.numberOfSources);
    this.shuffleArray(currentValues);
    for (var i = 0; i < currentValues.length; i++) {
      sources[i] = currentValues[i];
    }
    return sources;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  getWedges() {
    if (typeof this.state.sources === "function") {
      return this.state.sources().then(payload => {
        let currentValues = Object.values(payload);
        if (currentValues.length < this.state.numberOfSources) {
          payload = this.properNumberOfSources(currentValues);
        }
        this.setState({ wedgeSources: payload, spinning: "start" });
        return Promise.resolve("Success");
      });
    } else {
      let newOrder = this.shuffleArray(this.state.wedgeSources);
      this.setState({ wedgeSources: newOrder, spinning: "start" });
      return Promise.resolve("Success");
    }
  }

  spinBy(degree, selected) {
    return degree * selected - degree < 0 ? 0 : -(degree * selected - degree);
  }

  createWedges() {
    const wedges = [];
    const totalWedges = Object.keys(this.state.wedgeSources).length;
    const degree = 360 / totalWedges;
    let rotateBy = 0;
    const selected = Math.floor(Math.random() * totalWedges);
    let result;
    for (let key in this.state.wedgeSources) {
      const rotation = {
        transform: `rotate(${rotateBy}deg)`
      };
      if (key == selected || (selected == 0 && key == 1)) {
        console.log(this.state.wedgeSources[key]["image"]);
        result = this.state.wedgeSources[key]["result"];
      }
      wedges.push(
        <div key={key} style={rotation} className={`scaleDiv wedgePosition`}>
          <div className={"triangleTransform"}>
            <div>
              <img
                className={"sourceImage"}
                src={`${this.state.wedgeSources[`${key}`]["image"]}`}
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
        spinBy: this.spinBy(degree, selected) + this.state.rotations,
        disableButton: true,
        displayResult: false
      },
      () => {
        setTimeout(() => {
          this.setState({ displayResult: true, disableButton: false });
        }, this.state.revalTime);
      }
    );
    return Promise.resolve("Success");
  }

  startSpin() {
    this.getWedges().then(() => {
      this.createWedges();
    });
  }

  render() {
    let circleState;
    let spinner;
    let pointerColor = {
      borderColor: `${this.props.outerRingColor} transparent transparent`
    };
    if (this.state.spinning === "start") {
      circleState = {
        backgroundColor: `${this.props.backgroundStart}`,
        boxShadow: `0px 0px 0px 12px
    ${this.props.outerRingColor}`
      };
    } else {
      circleState = {
        backgroundColor: `${this.props.backgroundSpinning}`,
        boxShadow: `0px 0px 0px 12px
    ${this.props.outerRingColor}`,
        animation: "spin 5s",
        transform: `translate(-50%, 0%) rotate(${this.state.spinBy}deg)`
      };
    }

    const displayResult = this.state.displayResult ? (
      <div className={"displayResult"}>
        {this.props.displayResult(this.state.result)}
      </div>
    ) : null;
    const buttonStyle = {
      backgroundColor: this.props.buttonColor
    };
    // const buttonColor = { backgroundColor: this.props.buttonColor };
    return (
      <Fragment>
        <div className={"min"}>
          {displayResult}
          <div style={pointerColor} className={"pointer"} />
          <button
            disabled={this.state.disableButton}
            style={buttonStyle}
            className={"spinnerButton"}
            onClick={() => this.startSpin()}
          >
            Spin!
          </button>
          <div style={(spinner, circleState)} className={"circleStyle"}>
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
