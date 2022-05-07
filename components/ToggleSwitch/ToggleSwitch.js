import PropTypes from "prop-types";
import { useState } from "react";
import { btnStyles } from "../common/Buttons/buttonStyles";

export default function ToggleSwitch({
  name = "toggleSwitch",
  labels,
  onChange,
  checkedVal,
}) {
  return (
    <div className="flex mt-[10px] mb-[100px] justify-center divide-secondary divide-x-2 p-0">
      {labels.map((label, i) => {
        const isActive = checkedVal === label;
        return (
          <div
            key={label}
            className="cursor-pointer text-center px-[10px] leading-[16px]"
          >
            <input
              type="radio"
              id={label}
              name={name}
              value={label}
              onChange={onChange}
              checked={isActive}
              className="hidden"
            />
            <label
              className={`${
                isActive && "border-secondary border-b-[2px] pb-[3px]"
              } text-OpenSans text-secondary cursor-pointer mx-[20px] font-bold text-[16px]`}
              htmlFor={label}
            >
              {label.toUpperCase()}
            </label>
          </div>
        );
      })}
    </div>
  );
}

ToggleSwitch.propTypes = {
  name: PropTypes.string,
  labels: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  checkedVal: PropTypes.string.isRequired,
};
