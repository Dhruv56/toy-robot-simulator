import "./output.css";
import React from "react";

//Output component(stateless)
//Will show errors, postions of robot
const Output = (...props) => {
  return (
    <div className="output">
      {props[0].output.length !== 0 &&
        props[0].output.map(outputMessage => <p>{outputMessage}</p>)}
    </div>
  );
};

export default Output;
