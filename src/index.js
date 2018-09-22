import "./index.css";
import Simulator from "./containers/simulator/Simulator";
import React from "react";
import ReactDOM from "react-dom";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
ReactDOM.render(<Simulator />, document.getElementById("root"));
