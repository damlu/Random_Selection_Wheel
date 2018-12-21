import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactPlayer from "react-player";
import TenStreamers from "./twitchFiles/getTenStreamers";
import { SpinningWheel } from "./spinningwheel/displayComponent";
import "./App.css";
import { photosImages } from "./test_images";
// import { SpinningWheel } from "wheel-test";

class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfSources: 10,
      numberOfRotations: 10,
      durationOfSpin: 10,
      fadeInTime: 1,
      outerRingColor: "white",
      backgroundColor: "orange",
      buttonColor: "orange",
      buttonBorder: "black",
      showWedges: true,
      changableSettings: [
        ["numberOfSources", "Number of wedges: <br/> 10 - 100"],
        ["fadeInTime", "Duration of reveal: <br/> in secs"],
        ["durationOfSpin", "Duration of spinning: <br/> in secs"],
        [
          "numberOfRotations",
          "Number of rotations: <br/> if the number is to large, the wheel will abruptly stop then reveal the result"
        ]
      ],
      changableColorSettings: [
        ["outerRingColor", "Outer Ring Color"],
        ["backgroundColor", "Background Color"],
        ["buttonColor", "Button Color"],
        ["buttonBorder", "Button Border"]
      ],
      sources: this.getStreamers,
      displayResult: this.displayStream.bind(this),
      wheel: null,
      updated: false
    };
    this.getStreamers = this.getStreamers.bind(this);
    this.displayStream = this.displayStream.bind(this);
  }

  getStreamers() {
    const streamers = new TenStreamers();
    return streamers.getTenStreams().then(payload => {
      streamers.getTenImagesAndURLS(payload);
      return streamers.imagesAndURLS;
    });
  }

  displayStream(spinResult) {
    return <ReactPlayer url={`${spinResult}`} width={"inherit"} />;
  }

  display(spinResult) {
    return <img src={`${spinResult}`} alt="result" />;
  }

  updateValues(e) {
    const id = e.target.id;
    let value = e.target.value;
    if (value === "" || this.state[id] == value) {
      return;
    } else if (
      id.toLowerCase().includes("color") ||
      id.toLowerCase().includes("button")
    ) {
      this.setState({ [id]: value });
      return;
    } else if (e.target.id === "numberOfSources") {
      value = +e.target.value;
      if (value < 10) value = 10;
      if (value > 100) value = 100;
    } else if (e.target.id === "showWedges") {
      if (value === "false") {
        value = false;
      } else {
        value = true;
      }
    }
    this.setState({ [id]: value, updated: true });
  }

  updateSources(e) {
    let value = e.target.value;
    if (value === "function") {
      this.setState({
        sources: this.getStreamers,
        displayResult: this.displayStream.bind(this),
        updated: true
      });
    } else {
      const imageSources = photosImages;
      this.setState({
        sources: imageSources,
        displayResult: this.display.bind(this),
        updated: true
      });
    }
  }

  updateOnEnter(e) {
    if (e.key === "Enter") {
      this.updateValues(e);
    }
  }

  changableSettings(inputs) {
    const display = [];
    const settings = inputs;
    for (let i = 0; i < settings.length; i++) {
      const id = settings[i][0];
      let description = settings[i][1];
      display.push(
        <li key={i} className={"inputFormating"}>
          <p dangerouslySetInnerHTML={{ __html: description }} />
          <input
            id={`${id}`}
            type={"text"}
            onBlur={e => this.updateValues(e)}
            onKeyPress={e => this.updateOnEnter(e)}
          />
        </li>
      );
    }
    return display;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.updated) {
      this.spinningWheel();
    }
  }

  componentDidMount() {
    this.spinningWheel();
  }

  spinningWheel() {
    if (this.state.updated)
      this.setState({
        updated: false
      });
    return (
      <SpinningWheel
        sources={this.state.sources}
        displayResult={this.state.displayResult}
        buttonColor={this.state.buttonColor}
        backgroundColor={this.state.backgroundColor}
        outerRingColor={this.state.outerRingColor}
        numberOfSources={this.state.numberOfSources}
        buttonBorder={this.state.buttonBorder}
        fadeInTime={this.state.fadeInTime}
        durationOfSpin={this.state.durationOfSpin}
        rotations={this.state.numberOfRotations}
        showWedges={this.state.showWedges}
      />
    );
  }

  render() {
    let changableSettingsNumbers = this.changableSettings(
      this.state.changableSettings
    );
    let changableColorSettings = this.changableSettings(
      this.state.changableColorSettings
    );
    let wheel = !this.state.updated ? this.spinningWheel() : null;
    return (
      <Router>
        <Fragment>
          <div className={"centerArea"}>
            <div
              style={{ maxWidth: "285px", zIndex: 5 }}
              className={"changableSettings"}
            >
              <ul>
                <p>
                  Below you can modify the colors of the wheel. <br /> Please
                  use valid CSS colors
                </p>
                {changableColorSettings}
              </ul>
            </div>
            <div style={{ marginLeft: "50px", marginRight: "50px" }}>
              {wheel}
            </div>
            <div
              style={{ maxWidth: "285px", zIndex: 5 }}
              className={"changableSettings"}
            >
              <ul>
                <p>
                  Below you can modify the attrubutes of the wheel. <br />{" "}
                  Updating these elements will cause the wheel to reload its
                  contents
                </p>
                {changableSettingsNumbers}
              </ul>
            </div>
          </div>
          <div className={"lowerSetting"}>
            <div className={"centerItems"}>
              <p>Show Wedges before spin</p>
              <select
                value={this.state.showWedges}
                id={"showWedges"}
                onChange={e => this.updateValues(e)}
              >
                <option value={true}>true</option>
                <option value={false}>false</option>
              </select>
            </div>
            <div className={"centerItems"}>
              <p>Types of inputs</p>
              <select onChange={e => this.updateSources(e)}>
                <option defaultValue value={"function"}>
                  Results from API
                </option>
                <option value={"photosImages"}>Photos</option>
              </select>
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default BasicExample;
