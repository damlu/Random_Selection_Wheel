import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactPlayer from "react-player";
import TenStreamers from "./twitchFiles/getTenStreamers";
import SpinningWheel from "./spinningwheel/displayComponent";

class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      viewing: "",
      name: "",
      game: "",
      wedgesSource: {},
      result: "",
      numberOfSources: 20,
      outerRingColor: 'white',
      backgroundColor: 'orange',
      buttonColor: 'orange',
      buttonBorder: 'black',
      changableSettings: [
        ['numberOfSources', 'number of wedges <br/> 10 - 100'],
      ],
      changableColorSettings: [
        ['outerRingColor', 'Outer Ring Color'],
        ['backgroundColor', "Background Color"],
        ['buttonColor', 'Button Color'],
        ['buttonBorder','Button Border']
      ],
      testFiles: {
        "1": {
          image: "./test_images/Anybots_robot_monty.jpg",
          result: "./test_images/Anybots_robot_monty.jpg"
        },
        "2": {
          image: "./test_images/costume-head-horn-908686.jpg",
          result: "./test_images/costume-head-horn-908686.jpg"
        },
        "3": {
          image: "./test_images/step_6.jpg",
          result: "./test_images/step_6.jpg"
        }
        // "4": {
        //   image: "./test_images/step_6.jpg",
        //   result: "./test_images/step_6.jpg"
        // },
        // "5": {
        //   image: "./test_images/step_6.jpg",
        //   result: "./test_images/step_6.jpg"
        // },
        // "6": {
        //   image: "./test_images/step_6.jpg",
        //   result: "./test_images/step_6.jpg"
        // },
        // "7": {
        //   image: "./test_images/step_6.jpg",
        //   result: "./test_images/step_6.jpg"
        // },
        // "8": {
        //   image: "./test_images/step_6.jpg",
        //   result: "./test_images/step_6.jpg"
        // },
        // "9": {
        //   image: "./test_images/step_6.jpg",
        //   result: "./test_images/step_6.jpg"
        // },
        // "10": {
        //   image: "./test_images/step_6.jpg",
        //   result: "./test_images/step_6.jpg"
        // }
      }
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

  updateSources(e) {
    debugger
    const id = e.target.id;
    let value = e.target.value;
    if(e.target.id === 'numberOfSources'){
      let value = +e.target.value;
      if (value < 10) value = 10;
      if (value > 100) value = 100;
    }
    this.setState({ [id]: value });
  }

  updateOnEnter(e){
    if(e.key === 'Enter'){
      this.updateSources(e);
    }
  }

  changableSettings(inputs){
    debugger
    const display = [];
    const settings = inputs;
    for (let i = 0; i < settings.length; i++) {
      const id = settings[i][0];
      let description = settings[i][1];
      display.push(
        <li key={i}>
          <p dangerouslySetInnerHTML={{__html: description }}/>
          <input id={`${id}`} type={"text"} onBlur={e => this.updateSources(e)} onKeyPress={e=>this.updateOnEnter(e)} />
        </li>
      )
    }
    return display
  }

  render() {
    let changableSettingsNumbers = this.changableSettings(this.state.changableSettings)
    let changableColorSettings = this.changableSettings(this.state.changableColorSettings)
    return (
      <Router>
        <Fragment>
          <div>
            <ul>
              {changableSettingsNumbers}
            </ul>
            <ul>
              <p>Please use valid CSS colors</p>
              {changableColorSettings}
            </ul>
          </div>
          <div style={{marginLeft: '50px'}}>
            <SpinningWheel
              sources={this.getStreamers}
              displayResult={this.displayStream.bind(this)}
              buttonColor={this.state.buttonColor}
              backgroundColor={this.state.backgroundColor}
              outerRingColor={this.state.outerRingColor}
              numberOfSources={this.state.numberOfSources}
              buttonBorder={this.state.buttonBorder}
              fadeInTime={1.5}
              durationOfSpin={6}
              rotations={8}
              showWedges={true}
              />
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default BasicExample;
