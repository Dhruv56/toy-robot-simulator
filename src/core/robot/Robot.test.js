import Robot from "./Robot";
import { Errors } from "../../constants/CommonErrors";
import { ROBOT_CONFIG, TABLE_CONFIG } from "../../config/Config";
import Table from "../table/Table";

describe("The Robot", () => {
  let robot;
  let table;

  beforeAll(() => {
    table = new Table(TABLE_CONFIG);
    robot = new Robot(ROBOT_CONFIG, table);
  });

  test("Should throw an error if x,y or direction is missing from the PLACE command", () => {
    expect(robot.place()).toEqual(new Error(Errors.invalidDirection));
  });

  test("should not accept non-int X or Y", () => {
    let x = "foo";
    let y = "5,55";
    let direction = "North";
    expect(robot.place(x, y, direction)).toEqual(new Error(Errors.invalidXY));
  });

  test("should not accept negative X or Y", () => {
    let x = -5;
    let y = -5;
    let direction = "North";
    expect(robot.place(x, y, direction)).toEqual(new Error(Errors.invalidXY));
  });

  test("should not accept non-string or invalid direction", () => {
    let x = "5";
    let y = "5";
    let direction;
    expect(robot.place(x, y, direction)).toEqual(
      new Error(Errors.invalidDirection)
    );

    direction = 10;
    expect(robot.place(x, y, direction)).toEqual(
      new Error(Errors.invalidDirection)
    );

    direction = "something";
    expect(robot.place(x, y, direction)).toEqual(
      new Error(Errors.invalidDirection)
    );
  });

  test("should not be placed outside the table", () => {
    let x = 0;
    let y = 6;
    let direction = "north";
    expect(robot.place(x, y, direction)).toEqual;
    new Error(Errors.placedOutside);
  });

  test("should update x,y and direction upon successful place", () => {
    let x = 2;
    let y = 2;
    let direction = "south";
    robot.place(x, y, direction);
    let currentPosition = robot.getCurrentPosition();

    expect(
      currentPosition.x === x &&
        currentPosition.y === y &&
        currentPosition.direction === direction.toUpperCase()
    ).toBe(true);
  });

  // test('should have "isFirstStepMade = false" before initial PLACE', () => {
  //   expect(robot.isFirstStepMade()).toBe(false);
  // });

  // test('should set "isFirstStepMade = true" upon successful initial PLACE', () => {
  //   let x = 3;
  //   let y = 3;
  //   let direction = "south";
  //   robot.place(x, y, direction);
  //   expect(robot.isFirstStepMade()).toBe(true);
  // });

  test("should return itself if PLACE was successful", () => {
    let x = 1;
    let y = 1;
    let direction = "south";
    expect(robot.place(x, y, direction)).toEqual(robot);
  });

  test("should not be able to step out of the table", () => {
    let x = 4,
      y = 0,
      direction = "east";
    robot.place(x, y, direction);
    expect(robot.move()).toEqual(new Error(Errors.wrongMove));
  });

  test("should successfully make a correct move", () => {
    let x = 1;
    let y = 1;
    let direction = "north";

    robot.place(x, y, direction);
    robot.move();
    let currentPosition = robot.getCurrentPosition();

    expect(
      currentPosition.x == x &&
        currentPosition.y == y + 1 &&
        currentPosition.direction == direction.toUpperCase()
    ).toBe(true);
  });

  test("should turn right", () => {
    let x = 1;
    let y = 1;
    let direction = "north";
    robot.place(x, y, direction);
    robot.right();
    expect(robot.getCurrentPosition().direction).toEqual("EAST");
  });

  test("should turn left", () => {
    let x = 1;
    let y = 1;
    let direction = "north";
    robot.place(x, y, direction);
    robot.left();
    expect(robot.getCurrentPosition().direction).toEqual("WEST");
  });
});
