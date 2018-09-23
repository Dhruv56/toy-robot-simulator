import "./Robot.css";
import React from "react";
import robot from "../../assets/robot.png";

class ToyRobot extends React.Component {
  render() {
    // const direction = this.props.direction;
    const direction = "";
    return (
      <div>
        <img alt="toy-robot" className={`robot ${direction}`} src={robot} />
      </div>
    );
  }
}

export default ToyRobot;
