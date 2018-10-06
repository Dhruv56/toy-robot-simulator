/**
 * Table class - contains only one method isOutOfTable
 *
 * @export
 * @class Table
 */
export default class Table {
  constructor(tableConfig) {
    this.tableConfig = tableConfig;
  }

  isOutOfTable(x, y) {
    if (
      x > this.tableConfig.startX + (this.tableConfig.tableLengthX - 1) ||
      x < this.tableConfig.startX ||
      (y > this.tableConfig.startY + (this.tableConfig.tableLengthY - 1) ||
        y < this.tableConfig.startY)
    ) {
      return true;
    } else return false;
  }
}
