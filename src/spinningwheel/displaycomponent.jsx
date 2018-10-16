import React, { Fragment } from "react";
import "./style.css";

class SpinningWheel extends React.Component {
  constructor(props) {
    super(props);
    this.sources = this.props.sources;
  }

  render() {
    return (
      <Fragment>
        <div className={"circle"}>
          <p>help</p>
        </div>
      </Fragment>
    );
  }
}

export default SpinningWheel;
