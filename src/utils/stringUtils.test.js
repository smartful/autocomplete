import { wordsWithStartingLetters } from "./stringUtils.js";
import { flattenFilmsMock } from "../mocks/filmsMock";

describe("wordsWithStartingLetters", () => {
  test("Should return array of words which begin with the letters in argument", () => {
    expect(wordsWithStartingLetters("in", flattenFilmsMock)).toEqual([
      "Inception",
      "Interstellar",
      "Indiana Jones",
    ]);
  });
  test("Should return empty array if letters in argument is empty", () => {
    expect(wordsWithStartingLetters("", flattenFilmsMock)).toEqual([]);
  });
});
