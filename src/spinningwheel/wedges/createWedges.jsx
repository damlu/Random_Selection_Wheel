import React, { Fragment } from "react";
import "./styleWedges.css";

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

  triangleStyle(numOfWedges) {
    let leftSideObj = {
      10: 24,
      20: 37,
      30: 40,
      40: 43,
      50: 44,
      60: 45.5,
      70: 45.7,
      80: 45.8,
      90: 45.9,
      100: 47.2
    };
    let rightSideObj = {
      10: 76,
      20: 63,
      30: 60,
      40: 58,
      50: 56,
      60: 55,
      70: 54,
      80: 53,
      90: 52.5,
      100: 52.8
    };
    let numAsString = "" + numOfWedges;
    let onesPlace = +numAsString[numAsString.length - 1];
    if (onesPlace === 0) {
      return {
        clipPath: `polygon(50% 100%, ${leftSideObj[numOfWedges]}% 0%, ${
          rightSideObj[numOfWedges]
        }% 0%)`
      };
    } else {
      let tensPlace = +("" + numOfWedges)[0];
      let lowerRange = +(tensPlace + "0");
      let upperRange = +("" + (tensPlace + 1) + "0");
      let range = [lowerRange, upperRange];
      // console.log(range);

      let [leftSlope, rightSlope] = this.findTheSlope(
        range,
        leftSideObj,
        rightSideObj
      );
      // console.log(rightSideObj[lowerRange], "rightSideObj[lowerRange]");
      console.log(rightSlope * onesPlace, "rightSlope * onesPlace");
      console.log(leftSlope * onesPlace, "leftSlope * onesPlace");
      // console.log(leftSlope * onesPlace, "leftSlope * onesPlace");
      // console.log(leftSideObj[lowerRange], "leftSideObj[lowerRange]");
      let xRight = rightSlope * onesPlace + rightSideObj[lowerRange];
      let xLeft = leftSlope * onesPlace + leftSideObj[lowerRange];
      console.log(xLeft);
      console.log(xRight);

      return {
        clipPath: `polygon(50% 100%, ${xLeft}% 0%, ${xRight}% 0%)`
      };
    }
  }

  findTheSlope(range, leftKey, rightKey) {
    let lowerRange = range[0];
    let upperRange = range[1];
    // console.log(lowerRange, "lowerRange");
    // console.log(upperRange, "upperRange");
    // console.log(leftKey[upperRange], "leftKey[upperRange]");
    // console.log(leftKey[lowerRange], "leftKey[lowerRange]");
    // console.log(rightKey[upperRange], "rightKey[upperRange]");
    // console.log(rightKey[lowerRange], "rightKey[lowerRange]");

    let leftSlope = (leftKey[upperRange] - leftKey[lowerRange]) / 10;

    let rightSlope = (rightKey[upperRange] - rightKey[lowerRange]) / 10;
    console.log(leftSlope, "leftSlope");
    console.log(rightSlope, "rightSlope");

    return [leftSlope, rightSlope];
  }

  createWedges() {
    debugger;
    const wedges = [];
    const totalWedges = Object.keys(this.props.sources).length;
    const degree = 360 / totalWedges;
    let rotateBy = 0;
    const selected = Math.floor(Math.random() * totalWedges);
    let result;
    // let triangleStyle = null;
    let triangleStyle = this.triangleStyle(totalWedges);
    for (let key in this.props.sources) {
      const rotation = {
        transform: `rotate(${rotateBy}deg)`
      };

      if (key == selected || (selected == 0 && key == 1)) {
        console.log(this.props.sources[key]["image"]);
        console.log(this.props.sources[key]["result"]);
        result = this.props.sources[key]["result"];
      }

      wedges.push(
        <div key={key} style={rotation} className={`scaleDiv wedgePosition`}>
          <div style={triangleStyle} className={"triangleTransform"}>
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
