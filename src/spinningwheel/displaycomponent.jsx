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
      spinning: "start",
      wedges: null,
      wedgeSources: {},
      degree: 0,
      spinBy: 0,
      result: "",
      displayResult: false
    };
  }

  componentDidMount() {
    console.log("hey");
    if (typeof this.state.sources === "function") {
      this.getWedges();
      // this.state.sources().then(payload => {
      //   let currentValues = Object.values(payload);
      //   if (currentValues.length < this.state.numberOfSources) {
      //     payload = this.properNumberOfSources(currentValues);
      //   }
      //   this.setState({ wedgeSources: payload });
      // });
    } else {
      let sources = this.state.sources;
      let currentValues = Object.values(sources);
      if (currentValues.length < this.state.numberOfSources) {
        sources = this.properNumberOfSources(currentValues);
      } else this.setState({ wedgeSources: sources });
    }
  }

  // componentWillUpdate() {
  //   if (this.state.spinning === "stopped") {
  //     if (typeof this.state.sources === "function") {
  //       // console.log("hey");
  //       this.state.sources().then(payload => {
  //         let currentValues = Object.values(payload);
  //         if (currentValues.length < this.state.numberOfSources) {
  //           payload = this.properNumberOfSources(currentValues);
  //         }
  //         this.setState({ wedgeSources: payload, spinning: "start" });
  //       });
  //     }
  //   }
  // }

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

  createWedges() {
    const wedges = [];
    const totalWedges = Object.keys(this.state.wedgeSources).length;
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
        spinBy: spinBy() + this.state.rotations
        // displayResult: true
      },
      () => {
        setTimeout(() => {
          this.setState({ displayResult: true });
        }, this.state.revalTime);
      }
    );
    // this.props.passBackResult(this.state.result);
    return Promise.resolve("Success");
  }

  startSpin() {
    this.setState({ spinning: "stopped", displayResult: false });
    this.getWedges().then(() => {
      this.createWedges();
      // .then(() => {
      // console.log("wait");
      // let temp = new Date();
      // console.log(temp.toLocaleString());
      // // this.setState({ spinning: "stopped" });
      // setTimeout(() => {
      //   // console.log("start");
      //   // console.log(this.state.revalTime);
      //   let temp = new Date();
      //   console.log(temp.toLocaleString());
      //   this.setState({ displayResult: true });
      // }, this.state.revalTime);
      // });
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
    console.log(!!this.state.displayResult);
    const displayResult = this.state.displayResult ? (
      <div className={"displayResult"}>
        {this.props.displayResult(this.state.result)}
      </div>
    ) : null;
    const rel = { position: "relative" };
    // console.log(displayResult);
    return (
      <Fragment>
        <div className={"min"}>
          {displayResult}
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
