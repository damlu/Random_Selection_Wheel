import React, { Fragment } from "react";
import "./style.css";

class Wedges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: this.props.sources,
      rotations: this.props.rotations,
      wedges: null
    };
  }

  componentDidMount() {
    this.createWedges();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.sources !== this.props.sources) {
      this.createWedges();
    }
  }

  createWedges() {
    console.log(this.state.sources);
    const wedges = [];
    const totalWedges = Object.keys(this.props.sources).length;
    const degree = 360 / totalWedges;
    let rotateBy = 0;
    const selected = Math.floor(Math.random() * totalWedges);
    let result;
    for (let key in this.props.sources) {
      const rotation = {
        transform: `rotate(${rotateBy}deg)`
      };
      if (key == selected || (selected == 0 && key == 1)) {
        console.log(this.props.sources[key]["image"]);
        result = this.props.sources[key]["result"];
      }
      wedges.push(
        <div key={key} style={rotation} className={`scaleDiv wedgePosition`}>
          <div className={"triangleTransform"}>
            <div>
              <img
                className={"sourceImage"}
                src={`${this.props.sources[`${key}`]["image"]}`}
                alt="preview"
              />
            </div>
          </div>
        </div>
      );
      rotateBy += degree;
    }

    this.props.setResult(
      result,
      this.spinBy(degree, selected) + this.state.rotations
    );

    this.setState({
      wedges: wedges
      // result: result,
      // resultLocation: this.spinBy(degree, selected) + this.state.rotations,
      // displayResult: false
    });
  }

  spinBy(degree, selected) {
    return degree * selected - degree < 0 ? 0 : -(degree * selected - degree);
  }

  render() {
    return <Fragment>{this.state.wedges}</Fragment>;
  }
}

export default Wedges;
