import PropTypes from "prop-types";
import { formStyles } from "./formStyles";

export function Checkbox({
  name,
  label,
  register,
  size = "sm",
  validations,
  value,
}) {
  let classesToApply;
  switch (size) {
    case "sm":
      classesToApply =
        "w-[15px] h-[15px] tablet:w-[17px] tablet:h-[17px] desktop:w-[23px] desktop:h-[23px] mr-[7px] tablet:mr-[12px] mb-[5px] desktop:mb-[10px] border-2 color-black";
      break;

    case "lrg":
      classesToApply =
        "w-[19px] h-[19px] tablet:w-[22px] tablet:h-[22px] desktop:w-[30px] desktop:h-[30px] border-[4px] mr-[7px] tablet:mr-[12px] mb-[5px] desktop:mb-[10px] border-black";
      break;
  }
  return (
    <div className="flex">
      <div>
        <input
          {...register(name, validations)}
          type="checkbox"
          className={classesToApply}
          id={value}
          name={name}
          value={value}
        />
      </div>
      <p className={formStyles.checkBoxLabel.join(" ")}>{label}</p>
    </div>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  size: PropTypes.string,
  validations: PropTypes.object,
};
