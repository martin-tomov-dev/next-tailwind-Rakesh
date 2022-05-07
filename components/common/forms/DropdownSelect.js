import PropTypes from "prop-types";
import { dropdownSelectTypes } from "./dropdownSelectTypes";
export function DropdownSelect({
  name,
  options,
  register,
  type = "base",
  validations,
}) {
  return (
    <select
      {...register(name, validations)}
      name={name}
      id={name}
      className={`${dropdownSelectTypes[type].join(" ")}`}
    >
      {options.map((option, i) => (
        <option key={`option-${i}`} value={i === 0 ? "" : option}>
          {option}
        </option>
      ))}
    </select>
  );
}

DropdownSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.any,
  register: PropTypes.func.isRequired,
  type: PropTypes.string,
  validations: PropTypes.object.isRequired,
};
