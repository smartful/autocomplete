import { notEmptyArray } from "./arrayUtils.js";

export const fromObjectToArray = (object) => {
  const output = [];
  for (let value of Object.values(object).flat()) {
    if (typeof value === "string") {
      output.push(value);
    } else if (typeof value === "object") {
      const leaves = fromObjectToArray(value);
      for (let leaf of leaves) {
        output.push(leaf);
      }
    }
  }

  return output;
};

export const notEmptyObject = (obj) => {
  if (typeof obj === "undefined" || obj === null) {
    return false;
  }

  return (
    Object.keys(obj).length !== 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

export const expandObject = (object) => {
  let output = JSON.parse(JSON.stringify(object));
  for (let key in object) {
    if (notEmptyArray(object[key])) {
      for (let value of object[key]) {
        if (typeof value === "object") {
          output = Object.assign(output, value);
          const subObject = expandObject(value);
          if (notEmptyObject(subObject)) {
            output = Object.assign(output, subObject);
          }
        }
      }
    }
  }

  return output;
};
