import PropTypes from "prop-types";
import { Checkbox } from "../../../common/forms";
import { preferredWorkstyles } from "../../content/preferredWorkstyles";

export function PreferredWorkstyles({ register }) {
  return (
    <div>
      <p className="mb-[22px] desktop:mb-[22px] mt-[0px] desktop:mt-[12px] text-[11px] tablet:text-[12px] desktop:text-[14px]">
        <span className="font-bold">What are you preferred workstyles?</span>
        <span className="italic font-bold"> (select all that apply)</span>
      </p>
      <div className="flex flex-wrap place-content-between">
        {preferredWorkstyles.map((style, i) => (
          <div key={`${style}-${i}`} className="w-[31%]">
            <Checkbox
              name="preferredWorkStyles"
              label={style.label}
              register={register}
              validations={{}}
              value={style.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

PreferredWorkstyles.propTypes = {
  register: PropTypes.func.isRequired,
};
