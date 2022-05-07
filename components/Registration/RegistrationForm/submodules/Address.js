import PropTypes from "prop-types";
import { FormField } from "../../";
import { DropdownSelect } from "../../../common/forms";
import ErrorMessage from "../../../common/forms/ErrorMessage";
import { stateAbbreviations } from "../../content/stateAbbreviations";

export function Address({ register, errors }) {
  return (
    <>
      <FormField keyVal="address1" register={register} />
      <ErrorMessage errors={errors} name={"address1"} />
      <FormField keyVal="address2" register={register} />
      <ErrorMessage errors={errors} name={"address2"} />

      <div className="flex justify-between flex-wrap tablet:flex-nowrap desktop:space-x-[16px]">
        <div className="w-full tablet:w-[240px]">
          <FormField keyVal="city" register={register} />
        </div>
        <div className="w-full tablet:w-[100px] mt-[16px] tablet:mt-[0px] flex justify-center relative">
          <DropdownSelect
            name="state"
            register={register}
            options={["State*", ...stateAbbreviations]}
            type="registrationState"
            validations={{ required: "Must select State." }}
          />
        </div>
        <div className="w-full tablet:w-[120px] mt-[16px] tablet:mt-[0px]">
          <FormField keyVal="zip" register={register} />
        </div>
      </div>
      <ErrorMessage errors={errors} name={"city"} />
      <ErrorMessage errors={errors} name={"state"} />
      <ErrorMessage errors={errors} name={"zip"} />
    </>
  );
}

Address.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
