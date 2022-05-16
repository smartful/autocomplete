import React from "react";
import PropTypes from "prop-types";
import { colors } from "../color";

const LabelList = ({ result, handleClick }) => {
  return result.length ? (
    <ul className="label-list">
      {result.map((label) => {
        return (
          <li key={label} onClick={handleClick}>
            {label}
          </li>
        );
      })}
      <style jsx>
        {`
          .label-list {
            color: ${colors.mineShaft};
            border-top-width: 0;
            list-style: none;
            margin-top: 0;
            max-height: 200px;
            overflow-y: auto;
            padding-left: 0;
            width: 98%;
          }

          .label-list li {
            padding: 0.5rem;
          }

          .label-list li:hover {
            color: ${colors.dodgerBlue};
            border-bottom: 2px solid ${colors.dodgerBlue};
            cursor: pointer;
            font-weight: 600;
          }
        `}
      </style>
    </ul>
  ) : (
    <div className="empty-list">
      <em>Empty list</em>

      <style jsx>
        {`
          .empty-list {
            color: ${colors.iron};
            padding: 0.5rem;
          }
        `}
      </style>
    </div>
  );
};

LabelList.defaultProps = {
  labels: [],
};

LabelList.propTypes = {
  labels: PropTypes.array,
  handleClick: PropTypes.func,
};

export default LabelList;
