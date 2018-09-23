import "./Input.css";
import React, { Component } from "react";

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
    this.setState({ command: "" });
  };

  render() {
    return (
      <div>
        <textarea
          className="input-commands"
          rows={10}
          cols={20}
          onChange={this.handleInputChange}
          value={this.state.command}
        />
        <button className="execute-commands" onClick={this.handleExecuteAll}>
          Execute all
        </button>
        <button onClick={this.handleExecuteStepByStep}>
          Execute step by step
        </button>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

export default Input;
