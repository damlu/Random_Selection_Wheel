import React, { Fragment } from "react";
import "./displayComponentStyle.css";
import Wedges from "./wedges/createWedges.jsx";

class SpinningWheel extends React.Component {
  constructor(props) {
    super(props);
    this.startSpin = this.startSpin.bind(this);
    let numberOfSources = this.props.numberOfSources;
    if (!numberOfSources || numberOfSources < 10) {
      numberOfSources = 10;
    }
    this.state = {
      sources: this.props.sources,
      numberOfSources: numberOfSources,
      rotations: (this.props.rotations || 8) * 360,
      backgroundColor: this.props.backgroundColor,
      outerRingColor: this.props.outerRingColor,
      buttonColor: this.props.buttonColor,
      durationOfSpin: this.props.durationOfSpin || 5,
      showWedges: this.props.showWedges === false ? false : true,
      fadeInTime: this.props.fadeInTime || 1,
      spinning: false,
      wedgeSources: {},
      spinBy: 0,
      resultLocation: 0,
      result: "",
      displayResult: false,
      disableButton: false,
      resetWheel: false,
      setToZero: false,
      firstSpin: true,
      loadInResult: false
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
      }
      this.setWedges(sources);
    }
  }

  properNumberOfSources(sources) {
    let currentValues = Object.values(sources);
    while (currentValues.length < this.state.numberOfSources) {
      currentValues = [...currentValues, ...currentValues];
    }
    currentValues = currentValues.slice(0, this.state.numberOfSources);
    const newSources = this.createShuffleObj(currentValues);
    return newSources;
  }

  createShuffleObj(array) {
    let sources = {};
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    for (var k = 0; k < array.length; k++) {
      sources[k + 1] = array[k];
    }
    return sources;
  }

  getWedges() {
    if (typeof this.state.sources === "function") {
      return this.state.sources().then(payload => {
        let currentValues = Object.values(payload);
        if (
          currentValues.length < this.state.numberOfSources ||
          currentValues.length > this.state.numberOfSources
        ) {
          payload = this.properNumberOfSources(currentValues);
        }
        this.setWedges(payload);
      });
    } else {
      let newOrder = this.createShuffleObj(
        Object.values(this.state.wedgeSources)
      );
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
      setToZero: true,
      result: null,
      loadInResult: false
    });
  }

  setResult(result, resultLocation) {
    this.setState({
      result: result,
      resultLocation: resultLocation,
      loadInResult: true
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.numberOfSources !== this.props.numberOfSources) {
      this.setState({
        numberOfSources: this.props.numberOfSources,
        spinBy: 0,
        resultLocation: 0,
        displayResult: false,
        resetWheel: false,
        setToZero: true,
        result: null,
        loadInResult: false,
        spinning: false,
        firstSpin: true,
        showWedges: this.props.showWedges === false ? false : true
      });
    } else if (prevState.numberOfSources !== this.state.numberOfSources) {
      this.getWedges();
    } else if (
      !this.state.firstSpin &&
      !this.state.resetWheel &&
      prevState.result !== this.state.result
    ) {
      this.startSpin();
    } else if (
      prevState.result !== this.state.result &&
      this.state.showWedges &&
      this.state.spinning
    ) {
      this.startSpin();
    } else if (this.state.disableButton) {
      setTimeout(() => {
        this.setState({
          displayResult: true,
          disableButton: false,
          spinning: false,
          resetWheel: true
        });
      }, this.state.durationOfSpin * 1000);
    }
  }

  startSpin() {
    if (this.state.resetWheel) {
      this.getWedges();
    } else if (!this.state.showWedges) {
      this.setState({
        showWedges: true,
        spinning: true
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
        backgroundColor: `${this.props.backgroundColor}`,
        boxShadow: `0px 0px 0px 12px
        ${this.props.outerRingColor}`,
        transform: `translate(-50%, 0%) rotate(${this.state.spinBy}deg)`,
        transitionDuration: `${this.state.durationOfSpin}s`
      };
    } else {
      return {
        backgroundColor: `${this.props.backgroundColor}`,
        boxShadow: `0px 0px 0px 12px
        ${this.props.outerRingColor}`,
        transform: `translate(-50%, 0%) rotate(0deg)`
      };
    }
  }

  buttonStyle() {
    if (this.state.displayResult) {
      return {
        backgroundColor: this.props.buttonColor,
        transition: `opacity ${this.state.fadeInTime}s`,
        opacity: ".5",
        border: `4px solid ${this.props.buttonBorder}`
      };
    } else {
      return {
        backgroundColor: this.props.buttonColor,
        border: `4px solid ${this.props.buttonBorder}`
      };
    }
  }

  displayResultStyle() {
    if (this.state.displayResult) {
      return {
        transition: `opacity ${this.state.fadeInTime}s`,
        opacity: "1",
        zIndex: "4"
      };
    } else {
      return {
        opacity: "0"
      };
    }
  }

  render() {
    let circleState = this.circleStyle();
    let buttonStyle = this.buttonStyle();
    let displayResultStyle = this.displayResultStyle();
    let pointerColor = {
      borderColor: `${this.props.outerRingColor} transparent transparent`
    };

    let displayResult =
      this.state.loadInResult && this.state.result ? (
        <div style={displayResultStyle} className={"displayResult"}>
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
