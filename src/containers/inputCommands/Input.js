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
    this.setState({ commands: command.split(/\n/) }, function() {
      this.extractCommands();
    });
  };

  extractCommands = () => {
    const { commands } = this.state;
    let finalCommands = [];
    for (const command in commands) {
      if (commands[command].match(/PLACE.*/g)) {
        finalCommands = commands.splice(command);
        break;
      }
    }

    this.props.applyCommands(finalCommands);
  };

  render() {
    return (
      <React.Fragment>
        <textarea rows={10} cols={100} onChange={this.handleInputChange} />
        <button onClick={this.getRawCommands} />
      </React.Fragment>
    );
  }
}

export default Input;
