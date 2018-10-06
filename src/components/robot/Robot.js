import "./Robot.css";
import React from "react";
import robot from "../../assets/robot-north.png";

/**
 * Robot component
 *
 * @class ToyRobot
 * @extends {React.Component}
 */
class ToyRobot extends React.Component {
  render() {
    let { direction } = this.props;
    direction = direction ? direction.toLowerCase() : "";
    return (
      <div>
        <div className={`robot ${direction}`} />
      </div>
    );
  }
}

export default ToyRobot;
