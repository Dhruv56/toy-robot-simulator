import "./Simulator.css";
import { ROBOT_CONFIG, TABLE_CONFIG } from "../../configs/Config";
import React, { Component } from "react";
import Input from "../inputContainer/Input";
import Robot from "../../lib/robot/Robot";
import Table from "../../lib/table/Table";
import TableComponent from "../../components/table/TableComponent";
import ToyRobot from "../../components/robot/Robot";
import Output from "../../components/output/output";
import robot from "../../assets/robot-north.png";

/**
 * @author Dhruv Soni
 *
 * @class Simulator
 * @extends {Component}
 */
class Simulator extends Component {
  state = {
    //default position of the ROBOT
    coordinates: ROBOT_CONFIG.defaultPosition,
    executionStepIndex: 0,
    output: []
  };

  //configuring the robot and the table with their configs
  componentWillMount() {
    //TODO create robotFactory instead
    const table = new Table(TABLE_CONFIG);
    this.robot = new Robot(ROBOT_CONFIG, table);

    //exposing all the robot methods through robotCommands object
    this.robotCommands = {
      place: this.robot.place,
      move: this.robot.move,
      right: this.robot.right,
      left: this.robot.left,
      report: this.robot.report
    };
  }

  /**
   * @description executes a single command
   * @param {string} command - could be oneOf these - NORTH,SOUTH,EAST,WEST
   * @memberof Simulator
   */
  executeCommand = command => {
    let tempCommand = "";
    let output = "";
    let placeParams = [];

    //TODO - handle all space PLACE command
    // if the command is PLACE then extract the related params from the command
    tempCommand = command.split(" ");
    if (tempCommand[1]) {
      if (command.match(/PLACE.*/g)) {
        placeParams = tempCommand[1].split(",");
      } else {
        placeParams = tempCommand[1].split(" ");
      }
    }

    command = tempCommand[0];

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

  /**
   * @description Executes command in bulk
   * @param {string[]} - rawCommands
   * @memberof Simulator
   */
  executeAllCommands = rawCommands => {
    if (rawCommands.length) {
      const commands =
        rawCommands.length > 1
          ? this.extractCommands(rawCommands)
          : [rawCommands];
      commands.map(command => {
        this.executeCommand(command);
      });
      this.placeRobot(this.robot.report());
    }
  };

  /**
   * @description Executes command step by step
   * @param {string[]} - rawCommands
   * @memberof Simulator
   */
  executeCommandStepByStep = rawCommands => {
    if (rawCommands.length) {
      const commands = this.extractCommands(rawCommands);
      let { executionStepIndex } = this.state;
      if (executionStepIndex >= commands.length) {
        executionStepIndex = 1;
      } else {
        executionStepIndex += 1;
      }
      this.setState({ executionStepIndex }, function() {
        this.executeAllCommands(commands[executionStepIndex - 1]);
      });
    }
  };

  // split all the commands with newline
  extractCommands = commands => {
    let tempCommands = commands.split("\n");
    let finalCommands = tempCommands;
    tempCommands.map((command, index) => {
      if (command.match(/PLACE.*/g)) {
        finalCommands = tempCommands.slice(index);
        return;
      }
    });

    if (finalCommands === this.state.executedCommands) {
      return this.state.executeAllCommands;
    }

    this.setState({
      executedCommands: finalCommands
    });
    return finalCommands;
  };

  //place the robot on the table based on the final position
  placeRobot = finalPosition => {
    this.setState({ coordinates: finalPosition });
  };

  // set the output message which will be shown into the output panel
  setOutput = outputMessage => {
    let { output } = this.state;
    output.push(outputMessage);
    this.setState({ output: output });
  };

  //reset the position to default
  resetPosition = () => {
    this.robot.place(
      ROBOT_CONFIG.defaultPosition.x,
      ROBOT_CONFIG.defaultPosition.y,
      ROBOT_CONFIG.defaultPosition.direction
    );
    this.setState({
      coordinates: ROBOT_CONFIG.defaultPosition,
      output: [],
      executionStepIndex: 0
    });
  };

  render() {
    const { tableLengthX, tableLengthY } = TABLE_CONFIG;
    return (
      <div>
        <center>
          <img className="robot-logo" src={robot} />
        </center>
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
                resetPosition={this.resetPosition}
              />
            </div>
            <div className="output-container">
              <Output output={this.state.output} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Simulator;
