import PropTypes from "prop-types";
export function PasswordConditionCheck({ conditions }) {
  return (
    <div className="pt-[6px] tablet:pt-[20px] pb-[20px] text-[11px] tablet:text-[12px] desktop:text-[14px]">
      <p>Your Password Must Contain:</p>
      <ul className="mt-[8px] desktop:mt-[15px]">
        {conditions.map((item, i) => (
          <li key={`condition-${i}`}>
            {/* <div className="flex"> */}
            <input
              checked
              readOnly
              type="checkbox"
              className="accent-transparent mr-[5px] w-[9px] h-[9px] desktop:w-[13px] desktop:h-[13px]"
            />
            <label className="font-bold text-[11px] tablet:text-[12px] desktop:text-[14px]">
              {item}
            </label>
            {/* </div> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

PasswordConditionCheck.propTypes = {
  conditions: PropTypes.array.isRequired,
};
