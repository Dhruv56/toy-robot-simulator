import "./Simulator.css";
import React, { Component } from "react";
import Robot from "../../core/robot/Robot";
import Table from "../../core/table/Table";
import { ROBOT_CONFIG, TABLE_CONFIG } from "../../config/Config";
import { coordinates } from "../../constants";
import Input from "../inputCommands/Input";

class Simulator extends Component {
  state = { coordinates: [] };

  componentWillMount() {
    const table = new Table(TABLE_CONFIG);
    this.robot = new Robot(ROBOT_CONFIG, table);

    const a = coordinates.map(coordinate => (
      <div className="robot-grid-item" id={`${coordinate.x}:${coordinate.y}`} />
    ));
    this.setState({ coordinates: a });
  }

  applyCommands(commands) {
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
  }

  placeRobot = finalPosition => {
    const newCoordinates = coordinates.map(coordinate => {
      if (coordinate.x == finalPosition.x && finalPosition.y == coordinate.y) {
        return (
          <div
            className="robot-grid-item"
            id={`${coordinate.x}:${coordinate.y}`}
          >
            {5}
          </div>
        );
      }
      return (
        <div
          className="robot-grid-item"
          id={`${coordinate.x}:${coordinate.y}`}
        />
      );
    });

    this.setState({ coordinates: newCoordinates });
  };

  render() {
    return (
      <div className="App">
        <div className="robot-container">{this.state.coordinates}</div>
        <Input
          robot={this.robot}
          placeRobot={this.placeRobot}
          applyCommands={this.applyCommands}
        />
      </div>
    );
  }
}

export default Simulator;
