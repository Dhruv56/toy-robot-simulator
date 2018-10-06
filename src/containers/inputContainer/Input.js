import "./Input.css";
import React, { Component } from "react";
import { EXECUTE_STEP_BY_STEP, EXECUTE_ALL, RESET } from "./InputConstants";

/**
 * @author Dhruv Soni
 *
 * @class Input
 * @extends {Component}
 */
class Input extends Component {
  constructor() {
    super();
    this.state = { command: "" };
  }

  handleInputChange = e => {
    this.setState({ command: e.target.value });
  };

  handleExecuteAll = () => {
    this.props.executeAllCommands(this.state.command);
  };

  handleExecuteStepByStep = () => {
    this.props.executeCommandStepByStep(this.state.command);
  };

  reset = () => {
    this.setState({ command: "" }, function() {
      this.props.resetPosition();
    });
  };

  render() {
    return (
      <div>
        <textarea
          className="input-commands"
          rows={15}
          cols={20}
          onChange={this.handleInputChange}
          value={this.state.command}
        />
        <button className="execute-commands" onClick={this.handleExecuteAll}>
          {EXECUTE_ALL}
        </button>
        <button onClick={this.handleExecuteStepByStep}>
          {EXECUTE_STEP_BY_STEP}
        </button>
        <button onClick={this.reset}>{RESET}</button>
      </div>
    );
  }
}

export default Input;
