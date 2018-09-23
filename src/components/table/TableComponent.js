import "./TableComponent.css";
import React from "react";

class TableComponent extends React.Component {
  state = { table: "" };

  generateTable(height, width) {
    const gridHeight = new Array(height);
    const gridWidth = new Array(width);

    const boardRows = gridHeight.fill(0).map((tableHeight, index) => (
      <div className="table-grid-row" key={index}>
        {gridWidth.fill(0).map((width, i) => (
          <div
            className={`table-grid-item row-${index}-cell-${i}`}
            key={`row-${index}-cell-${i}`}
          >
            <div className="table-cell">
              {this.props.coordinates &&
              (this.props.coordinates.x === i &&
                this.props.coordinates.y === height - index - 1)
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
