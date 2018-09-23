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
