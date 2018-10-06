import "./TableComponent.css";
import React from "react";

/**
 * UI for the table. will generate the table based on height and width
 *
 * @class TableComponent
 * @extends {React.Component}
 */
class TableComponent extends React.Component {
  state = { table: "" };

  generateTable(height, width) {
    const gridHeight = new Array(height);
    const gridWidth = new Array(width);
    const { coordinates } = this.props;

    //generate the grid based on height and width
    //will plae the robot in cell, if position matches
    const boardRows = gridHeight.fill(0).map((tableHeight, index) => (
      <div className="table-grid-row" key={index}>
        {gridWidth.fill(0).map((width, i) => (
          <div
            className={`table-grid-item row-${index}-cell-${i}`}
            key={`row-${index}-cell-${i}`}
          >
            <div className="table-cell">
              {coordinates &&
              (coordinates.x === i && coordinates.y === height - index - 1)
                ? this.props.children
                : null}
            </div>
          </div>
        ))}
      </div>
    ));
    return boardRows;
  }

  render() {
    const { height, width } = this.props;
    const table = this.generateTable(height, width);
    return <div className="table-container">{table}</div>;
  }
}

export default TableComponent;
