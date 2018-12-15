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

  render() {
    return (
      <Router>
        <Fragment>
          <div>
            <p>number of wedges <br/> 10 - 100 </p>
            <input id={'numberOfSources'} type={"text"} onBlur={e => this.updateSources(e)} onKeyPress={e=>this.updateOnEnter(e)} />
            <p>Outer Ring Color</p>
            <input id={'outerRingColor'} type={"text"} onBlur={e => this.updateSources(e)} onKeyPress={e=>this.updateOnEnter(e)} />
            <p>Background Color</p>
            <input id={'backgroundColor'} type={"text"} onBlur={e => this.updateSources(e)} onKeyPress={e=>this.updateOnEnter(e)} />
            <p>Button Color</p>
            <input id={'buttonColor'} type={"text"} onBlur={e => this.updateSources(e)} onKeyPress={e=>this.updateOnEnter(e)} />
            <p>Button Border</p>
            <input id={'buttonBorder'} type={"text"} onBlur={e => this.updateSources(e)} onKeyPress={e=>this.updateOnEnter(e)} />
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
