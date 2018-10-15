import React, { Fragment } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import GetTenStreamers from "./getTenStreamers";

class TenStreamers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      broadcastInfo: ""
    };
  }

  // componentDidMount() {
  //   GetTenStreamers.
  // }
  render() {
    return (
      <Fragment>
        <p> Hello</p>
      </Fragment>
    );
  }
}

export default TenStreamers;
