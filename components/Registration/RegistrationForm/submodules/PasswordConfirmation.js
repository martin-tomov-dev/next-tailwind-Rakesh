import PropTypes from "prop-types";
import PasswordTextBox from "../../../common/forms/PasswordTextBox";
import ErrorMessage from "../../../common/forms/ErrorMessage";
import { PasswordConditionCheck } from "./PasswordConditionCheck";
import { passwordConditions } from "../../content/passwordConditions";

export function PasswordConfirmation({ errors, register, getValues }) {
  return (
    <div>
      <PasswordTextBox
        register={register}
        validations={{
          required: "Please confirm password!",
          pattern: {
            value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/,
            message: "Must meet password requirements.",
          },
        }}
        required
      />
      <ErrorMessage errors={errors} name={"password"} />
      <div className="mb-[16px] tablet:mb-[11px] desktop:mb-[15px]"></div>
      <PasswordTextBox
        name="confirmPassword"
        register={register}
        validations={{
          required: "Please confirm password!",
          validate: {
            matchesPreviousPassword: (value) => {
              const { password } = getValues();
              return password === value || "Passwords should match!";
            },
          },
        }}
        required
      />
      <ErrorMessage errors={errors} name={"confirmPassword"} />
      <PasswordConditionCheck conditions={passwordConditions} />
    </div>
  );
}

PasswordConfirmation.propTypes = {
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
};
