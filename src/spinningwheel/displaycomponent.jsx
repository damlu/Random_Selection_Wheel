import React, { Fragment } from "react";
import "./style.css";
import Wedges from "./wedges/createWedges.jsx";

class SpinningWheel extends React.Component {
  constructor(props) {
    super(props);
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
      durationOfSpin: this.props.durationOfSpin || "5s",
      showWedges: this.props.showWedges === false ? false : true,
      spinning: false,
      wedgeSources: {},
      spinBy: 0,
      resultLocation: 0,
      result: "",
      displayResult: false,
      disableButton: false,
      resetWheel: false,
      setToZero: false,
      firstSpin: true
    };
  }

  componentDidMount() {
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
        this.setWedges(payload);
      });
    } else {
      let newOrder = this.shuffleArray(this.state.wedgeSources);
      this.setWedges(newOrder);
    }
  }

  setWedges(sources) {
    this.setState({
      spinning: false,
      wedgeSources: sources,
      spinBy: 0,
      resultLocation: 0,
      displayResult: false,
      resetWheel: false,
      setToZero: true
    });
  }

  setResult(result, resultLocation) {
    this.setState({ result: result, resultLocation: resultLocation });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !this.state.firstSpin &&
      !this.state.resetWheel &&
      prevState.result !== this.state.result
    ) {
      this.startSpin();
    }
    if (prevState.result !== this.state.result && !this.state.showWedges) {
      this.startSpin();
    }
    if (this.state.disableButton) {
      setTimeout(() => {
        this.setState({
          displayResult: true,
          disableButton: false,
          spinning: false,
          resetWheel: true
        });
      }, this.state.revalTime);
    }
  }

  startSpin() {
    if (this.state.resetWheel) {
      this.getWedges();
    } else if (!this.state.showWedges) {
      this.setState({
        showWedges: true
      });
    } else {
      this.setState({
        spinBy: this.state.resultLocation,
        disableButton: true,
        spinning: true,
        setToZero: false,
        firstSpin: false
      });
    }
  }

  circleStyle() {
    if (!this.state.setToZero) {
      return {
        backgroundColor: `${this.props.backgroundSpinning}`,
        boxShadow: `0px 0px 0px 12px
        ${this.props.outerRingColor}`,
        transform: `translate(-50%, 0%) rotate(${this.state.spinBy}deg)`,
        transitionDuration: `${this.state.durationOfSpin}`
      };
    } else {
      return {
        backgroundColor: `${this.props.backgroundSpinning}`,
        boxShadow: `0px 0px 0px 12px
        ${this.props.outerRingColor}`,
        transform: `translate(-50%, 0%) rotate(0deg)`
      };
    }
  }

  render() {
    let circleState = this.circleStyle();
    let buttonStyle;

    let pointerColor = {
      borderColor: `${this.props.outerRingColor} transparent transparent`
    };
    if (this.state.displayResult) {
      buttonStyle = {
        backgroundColor: this.props.buttonColor,
        transition: "opacity 1s",
        opacity: ".5"
      };
    } else {
      buttonStyle = {
        backgroundColor: this.props.buttonColor
      };
    }

    const displayResult = this.state.displayResult ? (
      <div className={"displayResult"}>
        {this.props.displayResult(this.state.result)}
      </div>
    ) : null;

    const displayWedges = this.state.showWedges ? (
      <Wedges
        sources={this.state.wedgeSources}
        rotations={this.state.rotations}
        setResult={this.setResult.bind(this)}
      />
    ) : null;

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
          <div style={circleState} className={"circleStyle"}>
            <div className={"createCirlce"}>
              <div className={"cirlcePlacement"}>{displayWedges}</div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SpinningWheel;

// const spin = { "clipPath": "polygon(50% 100%, 18% 0%, 82% 0%)" };
