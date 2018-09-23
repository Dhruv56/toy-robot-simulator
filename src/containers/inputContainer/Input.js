import "./Input.css";
import React, { Component } from "react";

class Input extends Component {
  state = {
    command: "",
    commands: []
  };

  handleInputChange = e => {
    this.setState({ command: e.target.value });
  };

  getRawCommands = () => {
    const { command } = this.state;
    const { applyCommands } = this.props;
    this.setState(
      { commands: command.split(/\n/) },
      function extractCommands() {
        applyCommands(this.state.commands);
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <textarea
          className="input-commands"
          rows={10}
          cols={100}
          onChange={this.handleInputChange}
        />
        <button onClick={this.getRawCommands} />
      </React.Fragment>
    );
  }
}

export default Input;
