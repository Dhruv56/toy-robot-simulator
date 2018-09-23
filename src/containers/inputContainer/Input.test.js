import Input from "./Input";
import React from "react";
import { shallow } from "enzyme";

describe("Input component", () => {
  const inputWrapper = shallow(<Input />);

  it("should renders text-area and the button", () => {
    expect(inputWrapper.find("button")).toHaveLength(3);
    expect(inputWrapper.find("textarea")).toHaveLength(1);
  });

  it("should set state as given input", () => {
    const textArea = inputWrapper.find(".input-commands");
    textArea.simulate("change", { target: { value: "SAMPLE" } });
    expect(inputWrapper.state("command")).toEqual("SAMPLE");
  });
});
