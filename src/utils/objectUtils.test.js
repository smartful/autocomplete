import { fromObjectToArray, notEmptyObject, expandObject } from "./objectUtils";
import {
  filmsMock,
  flattenFilmsMock,
  expandedFilmsObjectMock,
} from "../mocks/filmsMock";

describe("fromObjectToArray", () => {
  test("Should transform value of a deep object in a flat array", () => {
    expect(fromObjectToArray(filmsMock)).toEqual(flattenFilmsMock);
  });
  test("Should transform value of a simple object in a flat array", () => {
    const simpleObject = {
      a: "AAA",
      b: "BBB",
    };
    expect(fromObjectToArray(simpleObject)).toEqual(["AAA", "BBB"]);
  });
  test("Should manage an empty input object", () => {
    expect(fromObjectToArray({})).toEqual([]);
  });
  test("Should manage type of numbers value", () => {
    const simpleObject = {
      a: "AAA",
      b: 2,
      c: "CCC",
    };
    expect(fromObjectToArray(simpleObject)).toEqual(["AAA", "CCC"]);
  });
});

describe("notEmptyObject", () => {
  test("Should return true if the input is a filled object", () => {
    expect(notEmptyObject({ toto: 123 })).toBe(true);
  });
  test("Should return false if the input is an empty object", () => {
    expect(notEmptyObject({})).toBe(false);
  });
  test("Should return false if the input is a string", () => {
    expect(notEmptyObject("Ceci est un texte")).toBe(false);
  });
  test("Should return false if the input is an array", () => {
    expect(notEmptyObject([1, 2, 3])).toBe(false);
  });
  test("Should return false if the input is undefined", () => {
    expect(notEmptyObject(undefined)).toBe(false);
  });
  test("Should return false if the input is null", () => {
    expect(notEmptyObject(null)).toBe(false);
  });
});

describe("expandObject", () => {
  test("Should transform value of a deep object in a flat object", () => {
    expect(expandObject(filmsMock)).toEqual(expandedFilmsObjectMock);
  });
  test("Should not transform a flat object", () => {
    const flatObject = {
      a: ["AAA", "AAB"],
      b: ["BBB", "BBA"],
    };
    expect(expandObject(flatObject)).toEqual(flatObject);
  });
  test("Should manage an empty input object", () => {
    expect(expandObject({})).toEqual({});
  });
  test("Should not transform an object with values which are not array", () => {
    const otherObject = {
      a: "AAA",
      b: 2,
      c: "CCC",
      d: ["AAA", "BBB"],
    };
    expect(expandObject(otherObject)).toEqual(otherObject);
  });
});
