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
    // console.log("getWedges");
    if (typeof this.state.sources === "function") {
      return this.state.sources().then(payload => {
        let currentValues = Object.values(payload);
        if (currentValues.length < this.state.numberOfSources) {
          payload = this.properNumberOfSources(currentValues);
        }
        this.setState({
          spinning: false,
          wedgeSources: payload,
          spinBy: 0,
          resultLocation: 0,
          displayResult: false,
          resetWheel: false,
          setToZero: true
        });
      });
    } else {
      let newOrder = this.shuffleArray(this.state.wedgeSources);
      this.setState({
        wedgeSources: newOrder,
        spinning: false,
        spinBy: 0,
        resultLocation: 0,
        displayResult: false,
        resetWheel: false,
        setToZero: true
      });
    }
  }

  // spinBy(degree, selected) {
  //   return degree * selected - degree < 0 ? 0 : -(degree * selected - degree);
  // }

  setResult(result, resultLocation) {
    // console.log("setResult");
    this.setState({ result: result, resultLocation: resultLocation });
  }

  // createWedges() {
  // console.log("createWedges");
  //   const wedges = [];
  //   const totalWedges = Object.keys(this.state.wedgeSources).length;
  //   const degree = 360 / totalWedges;
  //   let rotateBy = 0;
  //   const selected = Math.floor(Math.random() * totalWedges);
  //   let result;
  //   for (let key in this.state.wedgeSources) {
  //     const rotation = {
  //       transform: `rotate(${rotateBy}deg)`
  //     };
  //     if (key == selected || (selected == 0 && key == 1)) {
  // console.log(this.state.wedgeSources[key]["image"]);
  //       result = this.state.wedgeSources[key]["result"];
  //     }
  //     wedges.push(
  //       <div key={key} style={rotation} className={`scaleDiv wedgePosition`}>
  //         <div className={"triangleTransform"}>
  //           <div>
  //             <img
  //               className={"sourceImage"}
  //               src={`${this.state.wedgeSources[`${key}`]["image"]}`}
  //               alt="preview"
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     );
  //     rotateBy += degree;
  //   }
  //
  //   this.setState({
  //     wedges: wedges,
  //     result: result,
  //     resultLocation: this.spinBy(degree, selected) + this.state.rotations,
  //     displayResult: false
  //   });
  // }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps !== this.props) {
    // console.log("prevProps");
    // }
    // if (prevState !== this.state) {
    // console.log("prevState");
    // console.log(this.state);
    // }
    // console.log(prevState.result !== this.state.result);
    // console.log(this.state.resetWheel);
    if (
      !this.state.firstSpin &&
      !this.state.resetWheel &&
      prevState.result !== this.state.result
    ) {
      // console.log("path1");
      this.startSpin();
    }
    if (prevState.result !== this.state.result && !this.state.showWedges) {
      // console.log("path2");
      this.startSpin();
    }
    if (this.state.disableButton) {
      // console.log("path3");
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
    // console.log("startSpin");
    // console.log(this.state);
    if (this.state.resetWheel) {
      // console.log("resetWheel");
      this.getWedges();
    } else if (!this.state.showWedges) {
      // console.log("show wedges");
      this.setState({
        showWedges: true
      });
    } else {
      // console.log("regular");
      this.setState({
        spinBy: this.state.resultLocation,
        disableButton: true,
        spinning: true,
        setToZero: false,
        firstSpin: false
      });
    }
  }

  render() {
    // console.log("state change");
    // console.log(this.state);
    let circleState;
    let buttonStyle;

    let pointerColor = {
      borderColor: `${this.props.outerRingColor} transparent transparent`
    };
    if (this.state.displayResult) {
      buttonStyle = {
        backgroundColor: this.props.buttonColor,
        animation: "transparent",
        animationDuration: "1s",
        animationTimingFunction: "cubic-bezier(0.6, -0.28, 0.74, 0.05)",
        animationFillMode: "forwards"
      };
    } else {
      buttonStyle = {
        backgroundColor: this.props.buttonColor
      };
    }

    // circleState = {
    //   backgroundColor: `${this.props.backgroundSpinning}`,
    //   boxShadow: `0px 0px 0px 12px
    //     ${this.props.outerRingColor}`,
    //   transform: `translate(-50%, 0%) rotate(${this.state.spinBy}deg)`,
    //   transitionDuration: `${this.state.durationOfSpin}`
    // };

    //this is to reset the wheel back to zero
    if (!this.state.setToZero) {
      circleState = {
        backgroundColor: `${this.props.backgroundSpinning}`,
        boxShadow: `0px 0px 0px 12px
        ${this.props.outerRingColor}`,
        transform: `translate(-50%, 0%) rotate(${this.state.spinBy}deg)`,
        transitionDuration: `${this.state.durationOfSpin}`
      };
    } else {
      circleState = {
        backgroundColor: `${this.props.backgroundSpinning}`,
        boxShadow: `0px 0px 0px 12px
        ${this.props.outerRingColor}`,
        transform: `translate(-50%, 0%) rotate(0deg)`
      };
    }

    const displayResult = this.state.displayResult ? (
      <div className={"displayResult"}>
        {this.props.displayResult(this.state.result)}
      </div>
    ) : null;
    debugger;
    const displayWedges = this.state.showWedges ? (
      <Wedges
        sources={this.state.wedgeSources}
        rotations={this.state.rotations}
        setResult={this.setResult.bind(this)}
      />
    ) : null;
    // const buttonStyle = {
    //   backgroundColor: this.props.buttonColor
    // };
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
