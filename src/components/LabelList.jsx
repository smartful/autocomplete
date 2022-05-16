import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

import { colors } from "../color";
import { notEmptyArray } from "../utils/arrayUtils";
import { expandObject } from "../utils/objectUtils";

const LabelList = ({ labels, handleClick }) => {
  const [labelsToDisplay, setLabelToDisplay] = useState([]);
  const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);
  const [parentLabels, setParentLabels] = useState({});
  const [previous, setPrevious] = useState({
    name: "",
    currentList: "",
    parent: "",
  });
  const [extendedData, setExtendedData] = useState({});

  useEffect(() => {
    const initiaLabels = labels["main"].filter(
      (item) => typeof item === "string"
    );
    const initialCategories = labels["main"].filter(
      (item) => typeof item === "object"
    );
    const parents = createParentCategories(labels);
    const dataExpanded = expandObject(labels);

    setExtendedData(dataExpanded);
    setParentLabels(parents);
    setLabelToDisplay(initiaLabels);
    setCategoriesToDisplay(initialCategories);
    setPrevious({
      currentList: "main",
      parent: "main",
    });
  }, []);

  const createParentCategories = (items) => {
    let parents = {};
    Object.keys(items).forEach((category) => {
      const subCategories = items[category].filter(
        (item) => typeof item === "object"
      );
      if (notEmptyArray(subCategories)) {
        subCategories.forEach((subCategory) => {
          parents = Object.assign(parents, {
            [Object.keys(subCategory)]: category,
          });
          const subParents = createParentCategories(subCategory);
          parents = { ...parents, ...subParents };
        });
      }
    });

    return parents;
  };

  const deployedCategory = (category) => {
    const subCategories = extendedData[category].filter(
      (item) => typeof item === "object"
    );
    const newLabels = extendedData[category].filter(
      (item) => typeof item === "string"
    );
    const parentCategory = parentLabels[category];

    setPrevious({
      currentList: category,
      parent: parentCategory,
    });
    setLabelToDisplay(newLabels);
    setCategoriesToDisplay(subCategories);
  };

  return labelsToDisplay.length ? (
    <div className="label-list">
      {previous.currentList !== "main" && (
        <div
          className="previous"
          onClick={() => deployedCategory(previous.parent)}
        >
          <MdNavigateBefore />
          <span>{previous.parent}</span>
        </div>
      )}
      {labelsToDisplay.map((label) => {
        return (
          <div className="simple-label" key={label} onClick={handleClick}>
            {label}
          </div>
        );
      })}
      {categoriesToDisplay.map((category) => {
        const categoryLabel = Object.keys(category)[0];
        return (
          <div
            key={categoryLabel}
            className="category-list"
            onClick={() => deployedCategory(categoryLabel)}
          >
            <span>{categoryLabel}</span>
            <MdNavigateNext />
          </div>
        );
      })}
      <style jsx>
        {`
          .label-list {
            color: ${colors.mineShaft};
            border-top-width: 0;
            margin-top: 0;
            max-height: 200px;
            overflow-y: auto;
            padding-left: 0;
            width: 98%;
          }

          .label-list .simple-label {
            padding: 0.5rem;
          }

          .label-list {
            padding: 0.5rem;
          }

          .simple-label:hover {
            background-color: ${colors.anthensGray};
            cursor: pointer;
            font-weight: 600;
          }

          .category-list {
            display: flex;
            justify-content: space-between;
            font-weight: 800;
            padding: 0.5rem;
            cursor: pointer;
          }

          .category-list:hover {
            color: ${colors.dodgerBlue};
          }

          .previous {
            display: flex;
            justify-content: flex-start;
            font-weight: 800;
            padding: 0.5rem;
            cursor: pointer;
          }

          .previous:hover {
            color: ${colors.dodgerBlue};
          }

          .arrow {
            font-size: 20px;
          }
        `}
      </style>
    </div>
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
  labels: {},
};

LabelList.propTypes = {
  labels: PropTypes.object,
  handleClick: PropTypes.func,
};

export default LabelList;
