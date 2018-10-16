import React, { Fragment } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import GetStreamers from "./getTenStreamers";

class TenStreamers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      broadcastInfo: [],
      images: []
    };
    this.streamers = new GetStreamers();
  }

  componentDidMount() {
    this.streamers.getTenStreams().then(() => {
      this.streamers.getTenImages(this.streamers.broadcastInfo);
      this.setState({ images: this.streamers.previewImages });
    });
  }

  render() {
    const images = this.state.images
      ? this.state.images.map(images => {
          return (
            <div>
              <div>
                <img src={`${images}`} alt="preview" />
              </div>
            </div>
          );
        })
      : null;
    return <Fragment>{images}</Fragment>;
  }
}

export default TenStreamers;
