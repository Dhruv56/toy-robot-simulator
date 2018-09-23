import Input from "./Input";
import React from "react";
import { shallow } from "enzyme";

describe("Input component", () => {
  const inputWrapper = shallow(<Input />);

  it("should renders text-area and the button", () => {
    expect(inputWrapper.find("button")).toHaveLength(1);
    expect(inputWrapper.find("textarea")).toHaveLength(1);
  });

  it("should set state as given input", () => {
    const textArea = inputWrapper.find(".input-commands");
    textArea.simulate("change", { target: { value: "SAMPLE" } });
    expect(inputWrapper.state("command")).toEqual("SAMPLE");
  });

  it("should get the commands as an array", () => {
    const applyCommands = jest.fn();
    const inputWrapper = shallow(<Input applyCommands={applyCommands} />);
    const textArea = inputWrapper.find(".input-commands");
    const button = inputWrapper.find("button");
    textArea.simulate("change", {target: { value: "PLACE 1 1 N\nMOVE\nRIGHT\nMOVE\nREPORT" }});
    button.simulate("click");
    expect(inputWrapper.state("commands")).toEqual([
      "PLACE 1 1 N",
      "MOVE",
      "RIGHT",
      "MOVE",
      "REPORT"
    ]);
  });
});
