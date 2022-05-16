export const wordsWithStartingLetters = (letters, wordsBank) => {
  if (letters.length === 0) {
    return [];
  }

  const filteredWords = wordsBank.filter((word) =>
    word.toLowerCase().startsWith(letters.toLowerCase())
  );
  return filteredWords;
};
