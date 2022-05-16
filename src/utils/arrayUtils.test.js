import { notEmptyArray } from "./arrayUtils";

describe("notEmptyArray", () => {
  test("Should return true if the array is filled", () => {
    expect(notEmptyArray([1, 2, 3])).toBe(true);
  });
  test("Should return false if the array is empty", () => {
    expect(notEmptyArray([])).toBe(false);
  });
  test("Should return false if the input is an object", () => {
    expect(notEmptyArray({ toto: 123 })).toBe(false);
  });
  test("Should return false if the input is a string", () => {
    expect(notEmptyArray("Ceci est un texte")).toBe(false);
  });
  test("Should return false if the input is undefined", () => {
    expect(notEmptyArray(undefined)).toBe(false);
  });
  test("Should return false if the input is null", () => {
    expect(notEmptyArray(null)).toBe(false);
  });
});
