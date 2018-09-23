import { Errors } from "../../constants/CommonErrors";

/**
 * Robot class.
 * @export
 * @class Robot
 */
//TODO - Pass Erros as Props
export default class Robot {
  constructor(robotConfig, table) {
    this.robotConfig = robotConfig;
    this.table = table;
    this.currentPosition = {
      x: 0,
      y: 0,
      direction: "NORTH"
    };
    this.isFirstStepMade = false;
  }

  isFirstStepMade() {
    return this.isFirstStepMade;
  }

  place = (x, y, direction) => {
    let newCoordinates = {};

    newCoordinates = this.validateParams(x, y, direction);

    if (this.isOutOfTable(newCoordinates.x, newCoordinates.y)) {
      throw new Error(Errors.placedOutside);
    }

    this.setRobotPosition(
      newCoordinates.x,
      newCoordinates.y,
      newCoordinates.direction
    );

    // Save that initial PLACE has been made
    if (!this.isFirstStepMade) {
      this.isFirstStepMade = true;
    }

    return this;
  };

  move = () => {
    let { x, y, direction } = this.currentPosition;

    switch (direction) {
      case "NORTH":
        y++;
        break;
      case "EAST":
        x++;
        break;
      case "SOUTH":
        y--;
        break;
      case "WEST":
        x--;
        break;
    }

    if (this.isOutOfTable(x, y)) {
      throw new Error(Errors.wrongMove);
    }

    this.setRobotPosition(x, y, direction);

    return this;
  };

  right = () => {
    const { direction } = this.currentPosition;
    const { directions } = this.robotConfig;

    //remove this.currentPosition
    const newDirection =
      directions.indexOf(direction) + 1 > 3
        ? 0
        : directions.indexOf(direction) + 1;

    this.currentPosition.direction = directions[newDirection];
    return this;
  };

  left = () => {
    const { direction } = this.currentPosition;
    const { directions } = this.robotConfig;

    //remove this.currentPosition
    const newDirection =
      directions.indexOf(direction) - 1 < 0
        ? 3
        : directions.indexOf(direction) - 1;

    this.currentPosition.direction = directions[newDirection];

    return this;
  };

  report = () => this.getCurrentPosition();

  setRobotPosition(x, y, direction) {
    this.currentPosition = {
      x,
      y,
      direction
    };
  }

  getCurrentPosition = () => this.currentPosition;

  isOutOfTable = (x, y) => this.table.isOutOfTable(x, y);

  validateParams = (x, y, direction) => {
    if (
      !direction ||
      typeof direction !== "string" ||
      !this.isValidDirection(direction)
    ) {
      throw new Error(Errors.invalidDirection);
    }

    direction = direction.toUpperCase();
    x = parseInt(x);
    y = parseInt(y);

    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new Error(Errors.invalidXY);
    }

    if (x < 0 || y < 0) {
      throw new Error(Errors.invalidXY);
    }

    return {
      x,
      y,
      direction
    };
  };

  isValidDirection = direction =>
    this.robotConfig.directions.indexOf(direction.toUpperCase()) !== -1;
}
