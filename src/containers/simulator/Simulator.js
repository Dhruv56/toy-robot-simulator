import "./Simulator.css";
import React, { Component } from "react";
import Robot from "../../core/robot/Robot";
import Table from "../../core/table/Table";
import { ROBOT_CONFIG, TABLE_CONFIG } from "../../configs/Config";
import Input from "../inputContainer/Input";
import TableComponent from "../../components/table/TableComponent";
import ToyRobot from "../../components/robot/Robot";

class Simulator extends Component {
  state = { coordinates: {} };

  componentWillMount() {
    const table = new Table(TABLE_CONFIG);
    this.robot = new Robot(ROBOT_CONFIG, table);
  }

  applyCommands = commands => {
    commands.map(command => {
      const robot = this.robot;
      let newCommand = "";
      let placeParams;
      // handle all space command
      if (command.match(/PLACE.*/g)) {
        newCommand = command.split(" ");
        placeParams = newCommand[1];
        command = newCommand[0];
      }
      command = command.toUpperCase();
      switch (command) {
        case "PLACE":
          const b = placeParams.split(",");
          robot.place(b[0], b[1], b[2]);
          this.placeRobot(robot.report());
          break;
        case "MOVE":
          robot.move();
          this.placeRobot(robot.report());
          break;
        case "LEFT":
          robot.left();
          break;
        case "RIGHT":
          robot.right();
          break;
        case "REPORT":
          this.placeRobot(robot.report());
          break;
      }
    });
  };

  placeRobot = finalPosition => {
    this.setState({ coordinates: finalPosition });
  };

  render() {
    const { tableLengthX, tableLengthY } = TABLE_CONFIG;
    return (
      <div className="robot-simulator">
        <TableComponent
          height={tableLengthY}
          width={tableLengthX}
          coordinates={this.state.coordinates}
        >
          <ToyRobot direction={this.state.coordinates.direction} />
        </TableComponent>
        <div className="input-container">
          <Input
            robot={this.robot}
            placeRobot={this.placeRobot}
            applyCommands={this.applyCommands}
          />
        </div>
      </div>
    );
  }
}

export default Simulator;
