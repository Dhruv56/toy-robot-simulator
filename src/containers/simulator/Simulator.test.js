import React from "react";
import { shallow } from "enzyme";
import Simulator from "./Simulator";

describe("Simulator", () => {
  const simulatorWrapper = shallow(<Simulator />);

  it("should place the robot", () => {
    const sampleCommands = "PLACE 1,1,NORTH";

    simulatorWrapper.instance().executeAllCommands(sampleCommands);
    expect(simulatorWrapper.state("coordinates")).toEqual({
      x: 1,
      y: 1,
      direction: "NORTH"
    });
  });

  it("should split the commands with /n", () => {
    const rawCommand = "PLACE 1,1,NORTH\nMOVE";
    const extractedCommands = ["PLACE 1,1,NORTH", "MOVE"];
    expect(simulatorWrapper.instance().extractCommands(rawCommand)).toEqual(
      extractedCommands
    );
  });

  it("should execute all the commands and set coordinates accordingly", () => {
    const rawCommand = "PLACE 1,1,NORTH\nMOVE";
    simulatorWrapper.instance().executeAllCommands(rawCommand);

    expect(simulatorWrapper.state("coordinates")).toEqual({
      x: 1,
      y: 2,
      direction: "NORTH"
    });
  });

  it("should execute commands step by step and set coordinates accordingly", () => {
    const rawCommand = "PLACE 1,1,NORTH\nMOVE";
    simulatorWrapper.instance().executeCommandStepByStep(rawCommand);

    expect(simulatorWrapper.state("coordinates")).toEqual({
      x: 1,
      y: 1,
      direction: "NORTH"
    });

    simulatorWrapper.instance().executeCommandStepByStep(rawCommand);

    expect(simulatorWrapper.state("coordinates")).toEqual({
      x: 1,
      y: 2,
      direction: "NORTH"
    });
  });

  // it("should get the commands as an array", () => {
  //   const applyCommands = jest.fn();
  //   const inputWrapper = shallow(<Input applyCommands={applyCommands} />);
  //   const textArea = inputWrapper.find(".input-commands");
  //   const button = inputWrapper.find("button");
  //   textArea.simulate("change", {target: { value: "PLACE 1,1,NORTH\nMOVE\nRIGHT\nMOVE\nREPORT" }});
  //   button.simulate("click");
  //   expect(inputWrapper.state("commands")).toEqual([
  //     "PLACE 1,1,NORTH",
  //     "MOVE",
  //     "RIGHT",
  //     "MOVE",
  //     "REPORT"
  //   ]);
  // });
});
