import Robot from "./Robot";
import { Errors } from "../../constants/CommonErrors";
import { ROBOT_CONFIG, TABLE_CONFIG } from "../../configs/Config";
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
    const x = "foo";
    const y = "5,55";
    const direction = "North";
    expect(robot.place(x, y, direction)).toEqual(new Error(Errors.invalidXY));
  });

  test("should not accept negative X or Y", () => {
    const x = -5;
    const y = -5;
    const direction = "North";
    expect(robot.place(x, y, direction)).toEqual(new Error(Errors.invalidXY));
  });

  test("should not accept non-string or invalid direction", () => {
    const x = "5";
    const y = "5";
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
    const x = 0;
    const y = 6;
    const direction = "north";
    expect(robot.place(x, y, direction)).toEqual;
    new Error(Errors.placedOutside);
  });

  test("should update x,y and direction upon successful place", () => {
    const x = 2;
    const y = 2;
    const direction = "south";
    robot.place(x, y, direction);
    const currentPosition = robot.getCurrentPosition();

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
    const x = 1;
    const y = 1;
    const direction = "south";
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
    const x = 1;
    const y = 1;
    const direction = "north";

    robot.place(x, y, direction);
    robot.move();
    const currentPosition = robot.getCurrentPosition();

    expect(
      currentPosition.x == x &&
        currentPosition.y == y + 1 &&
        currentPosition.direction == direction.toUpperCase()
    ).toBe(true);
  });

  test("should turn right", () => {
    const x = 1;
    const y = 1;
    const direction = "north";
    robot.place(x, y, direction);
    robot.right();
    expect(robot.getCurrentPosition().direction).toEqual("EAST");
  });

  test("should turn left", () => {
    const x = 1;
    const y = 1;
    const direction = "north";
    robot.place(x, y, direction);
    robot.left();
    expect(robot.getCurrentPosition().direction).toEqual("WEST");
  });
});
