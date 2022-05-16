import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaEject } from "react-icons/fa";
import { MdClear } from "react-icons/md";

import { colors } from "../color";
import LabelList from "./LabelList";
import AutocompleteResult from "./AutocompleteResult";
import { fromObjectToArray } from "../utils/objectUtils";
import { wordsWithStartingLetters } from "../utils/stringUtils";
import { useAsyncState } from "../utils/hooks";

const screen = {
  init: 0,
  autocomplete: 1,
  none: 99,
};

const Autocomplete = ({ labels, name }) => {
  const filtrated = useAsyncState([]);
  const userInput = useAsyncState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayScreen, setDisplayScreen] = useState(screen["none"]);
  const [flattedLabels, setFlattedLabels] = useState([]);

  useEffect(() => {
    setFlattedLabels(fromObjectToArray(labels));
  }, [labels]);

  const handleChange = (event) => {
    userInput.set(event.target.value);
    if (event.target.value.length !== 0) {
      const filteredLabels = wordsWithStartingLetters(
        userInput.get(),
        flattedLabels
      );
      filtrated.set(filteredLabels);
      setActiveIndex(0);
      setDisplayScreen(screen["autocomplete"]);
    } else {
      setDisplayScreen(screen["init"]);
    }
  };

  const handleClick = (event) => {
    filtrated.set([]);
    userInput.set(event.target.innerText);
    setActiveIndex(0);
  };

  const closeDisplay = () => {
    setDisplayScreen(screen["none"]);
  };

  return (
    <div className="autocomplete">
      <div className="container">
        <input
          type="text"
          id="userInput"
          value={userInput.get()}
          onChange={handleChange}
          onFocus={() => setDisplayScreen(screen["init"])}
        />
        {name && (
          <label htmlFor="userInput" className="placeholderText">
            <div className="text">{name}</div>
            <div className="btn-action">
              <button className="erase" onClick={() => userInput.set("")}>
                <MdClear />
              </button>
              <button className="close" onClick={closeDisplay}>
                <FaEject />
              </button>
            </div>
          </label>
        )}
      </div>

      {displayScreen === screen["init"] && (
        <LabelList labels={labels} handleClick={handleClick} />
      )}
      {displayScreen === screen["autocomplete"] && (
        <AutocompleteResult
          result={filtrated.get()}
          activeIndex={activeIndex}
          handleClick={handleClick}
        />
      )}

      <style jsx>
        {`
          .container {
            position: relative;
          }

          input {
            height: 3rem;
            width: 90%;
            border: none;
            border-bottom: 1px solid ${colors.stormGray};
            background-color: ${colors.anthensGray};
            cursor: text;
          }

          .placeholderText {
            cursor: text;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            border: 2px solid transparent;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .text {
            font-size: 1rem;
            padding: 0 0.5rem;
            color: ${colors.stormGray};
          }

          .btn-action {
            display: flex;
            justify-content: space-around;
          }

          .erase {
            color: ${colors.stormGray};
            background-color: ${colors.anthensGray};
            border: 0;
            cursor: pointer;
          }

          .erase:hover {
            color: ${colors.mineShaft};
          }

          .close {
            color: ${colors.stormGray};
            background-color: ${colors.anthensGray};
            border: 0;
            cursor: pointer;
            display: ${displayScreen === screen["none"] ? "none" : "block"};
          }

          .close:hover {
            color: ${colors.mineShaft};
          }

          input,
          placeholderText {
            font-size: 1rem;
            padding: 26px 0 8px 12px;
          }

          input:focus {
            outline: none;
            border-bottom: 2px solid ${colors.dodgerBlue};
            animation-name: focusfield;
            animation-duration: 200ms;
          }

          @keyframes focusfield {
            from {
              border-bottom: 1px solid ${colors.stormGray};
            }
            to {
              border-bottom: 2px solid ${colors.dodgerBlue};
            }
          }

          input:focus + .placeholderText .text,
          :not(input[value=""]) + .placeholderText .text {
            background-color: transparent;
            font-size: 0.7rem;
            transform: translate(0, -100%);
            color: ${colors.dodgerBlue};
          }

          .text {
            transform: translate(0);
            transition-property: transform;
            transition-duration: 200ms;
            transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
            transition-property: font-size;
            transition-duration: 200ms;
            transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
            transition-property: background-color;
            transition-duration: 200ms;
            transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
            transition-property: color;
            transition-duration: 200ms;
            transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        `}
      </style>
    </div>
  );
};

Autocomplete.defaultProps = {
  labels: [],
};

Autocomplete.propTypes = {
  labels: PropTypes.object,
};

export default Autocomplete;
