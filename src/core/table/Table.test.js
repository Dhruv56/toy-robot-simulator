import { TABLE_CONFIG } from "../../configs/Config";
import Table from "./Table";

describe("validating x and y on the table", () => {
  let table;
  const invalidX = TABLE_CONFIG.startX - 1;
  const invalidY = TABLE_CONFIG.startY - 1;
  const validX = TABLE_CONFIG.tableLengthX - 1;
  const validY = TABLE_CONFIG.tableLengthX - 1;

  beforeAll(() => {
    table = new Table(TABLE_CONFIG);
  });

  // y is outside (negative)
  test("should return true", () => {
    expect(table.isOutOfTable(validX, invalidY)).toBe(true);
  });

  // y is outside
  test("should return true", () => {
    expect(table.isOutOfTable(validX, validY + 1)).toBe(true);
  });

  // x is outside (negative)
  test("should return true", () => {
    expect(table.isOutOfTable(invalidX, validY)).toBe(true);
  });

  // x is outside
  test("should return true", () => {
    expect(table.isOutOfTable(validX + 1, validY)).toBe(true);
  });

  // x & y is inside
  test("should return false", () => {
    expect(table.isOutOfTable(validX, validY)).toBe(false);
  });
});
