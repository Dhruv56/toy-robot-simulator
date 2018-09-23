import "./Simulator.css";
import { ROBOT_CONFIG, TABLE_CONFIG } from "../../configs/Config";
import React, { Component } from "react";
import Input from "../inputContainer/Input";
import Robot from "../../core/robot/Robot";
import Table from "../../core/table/Table";
import TableComponent from "../../components/table/TableComponent";
import ToyRobot from "../../components/robot/Robot";
import Output from "../../components/output/output";

class Simulator extends Component {
  state = {
    coordinates: {},
    executionStepIndex: 0
  };

  componentWillMount() {
    const table = new Table(TABLE_CONFIG);
    this.robot = new Robot(ROBOT_CONFIG, table);
    this.robotCommands = {
      place: this.robot.place,
      move: this.robot.move,
      right: this.robot.right,
      left: this.robot.left,
      report: this.robot.report
    };
  }

  executeCommand = command => {
    let newCommand = "";
    let output = "";
    let placeParams = [];
    // handle all space command
    if (command.match(/PLACE.*/g)) {
      newCommand = command.split(" ");
      placeParams = newCommand[1].split(",");
      command = newCommand[0];
    }
    command = command.toLowerCase();

    try {
      if (!this.robotCommands.hasOwnProperty(command)) {
        throw new Error("Invalid Commands");
      }
    } catch (e) {
      this.setOutput(e.message);
      return;
    }

    try {
      return (output = this.robotCommands[command].call(
        null,
        placeParams[0],
        placeParams[1],
        placeParams[2]
      ));
    } catch (e) {
      this.setOutput(e.message);
    }
  };

  executeAllCommands = rawCommands => {
    const commands =
      rawCommands.length > 1 ? this.extractCommands(rawCommands) : rawCommands;
    commands.map(command => {
      this.executeCommand(command);
    });
    this.placeRobot(this.robot.report());
  };

  executeCommandStepByStep = rawCommands => {
    const commands = this.extractCommands(rawCommands);
    let { executionStepIndex } = this.state;
    if (executionStepIndex >= commands.length) {
      executionStepIndex = 1;
    } else {
      executionStepIndex += 1;
    }
    this.setState({ executionStepIndex }, function() {
      this.executeAllCommands([commands[executionStepIndex - 1]]);
    });
  };

  extractCommands = commands => commands.split("\n");

  placeRobot = finalPosition => {
    this.setState({ coordinates: finalPosition });
  };

  setOutput = output => {
    this.setState({ output });
  };

  render() {
    const { tableLengthX, tableLengthY } = TABLE_CONFIG;
    return (
      <div className="robot-simulator">
        <div className="table">
          <TableComponent
            height={tableLengthY}
            width={tableLengthX}
            coordinates={this.state.coordinates}
          >
            <ToyRobot direction={this.state.coordinates.direction} />
          </TableComponent>
        </div>
        <div className="input-output-container">
          <div className="input-container">
            <Input
              robot={this.robot}
              placeRobot={this.placeRobot}
              executeAllCommands={this.executeAllCommands}
              executeCommandStepByStep={this.executeCommandStepByStep}
            />
          </div>
          <div className="output-container">
            <Output output={this.state.output} />
          </div>
        </div>
      </div>
    );
  }
}

export default Simulator;
