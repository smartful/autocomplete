import { useState } from "react";

export const useAsyncState = (initialState) => {
  const [asyncState, setAsyncState] = useState(initialState);

  let current = asyncState;

  const get = () => current;

  const set = (newValue) => {
    current = newValue;
    setAsyncState(newValue);
    return current;
  };

  return {
    get,
    set,
  };
};
