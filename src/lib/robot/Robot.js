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
    this.firstStepMade = false;
  }

  // returns true if first PLACE command has successfully executed
  isFirstStepMade() {
    return this.firstStepMade;
  }

  /**
   * This method is for the PLACE command. will set the currentPosition of robot based on the
   * givrn params
   *
   * @memberof Robot
   * @param {integer} x - x coordinate of Robot
   * @param {integer} y - y coordinates of Robot on the Table
   * @param {string} direction - facing direction of robot. it could be oneOf these - NORTH,SOUTH,EAST,WEST
   */
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
    if (!this.firstStepMade) {
      this.firstStepMade = true;
    }

    return this;
  };

  /**
   * This method is for MOVE command
   * @description Robot will move 1 step in the current facing direction
   * @memberof Robot
   */
  move = n => {
    if (this.firstStepMade) {
      let { x, y, direction } = this.currentPosition;
      n = parseInt(n) || 1;
      switch (direction) {
        case "NORTH":
          y += n;
          break;
        case "EAST":
          x += n;
          break;
        case "SOUTH":
          y -= n;
          break;
        case "WEST":
          x -= n;
          break;
      }

      if (this.isOutOfTable(x, y)) {
        throw new Error(Errors.wrongMove);
      }

      this.setRobotPosition(x, y, direction);

      return this;
    }
  };

  /**
   * This method is for RIGHT command
   * @description Will turn 90 degree in the right direction
   * @memberof Robot
   */
  right = () => {
    if (this.firstStepMade) {
      const { direction } = this.currentPosition;
      const { directions } = this.robotConfig;

      //TODO - remove this.currentPosition
      const newDirection =
        directions.indexOf(direction) + 1 > 3
          ? 0
          : directions.indexOf(direction) + 1;

      this.currentPosition.direction = directions[newDirection];
      return this;
    }
  };

  /**
   * This method is for LEFT command
   * @description Will turn 90 degree in the left direction
   * @memberof Robot
   */
  left = () => {
    if (this.firstStepMade) {
      const { direction } = this.currentPosition;
      const { directions } = this.robotConfig;

      //remove this.currentPosition
      const newDirection =
        directions.indexOf(direction) - 1 < 0
          ? 3
          : directions.indexOf(direction) - 1;

      this.currentPosition.direction = directions[newDirection];

      return this;
    }
  };

  /**
   * This method is for REPORT command
   * @description Will return updated position of the ROBOT
   * @memberof Robot
   */
  report = () => this.getCurrentPosition();

  //Set the current position of the ROBOT
  setRobotPosition(x, y, direction) {
    this.currentPosition = {
      x,
      y,
      direction
    };
  }

  // returns current position of the robot
  getCurrentPosition = () => this.currentPosition;

  // will use isOutOfTable method of Table class to determine if the robot is being
  // placed outside of the table or not
  isOutOfTable = (x, y) => this.table.isOutOfTable(x, y);

  //validates params of PLACE command
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
