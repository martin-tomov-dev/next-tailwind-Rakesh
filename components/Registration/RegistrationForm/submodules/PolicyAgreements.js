import Link from "next/link";
import PropTypes from "prop-types";
import { Checkbox } from "../../../common/forms";
import ErrorMessage from "../../../common/forms/ErrorMessage";
import { formStyles } from "../../../common/forms";

export function PolicyAgreements({ register, errors }) {
  return (
    <div>
      <div className="flex">
        <Checkbox
          name="acceptTerms"
          label=""
          register={register}
          size="lrg"
          validations={{
            required: "Must Consent",
          }}
        />
        <p className={formStyles.checkBoxLabel.join(" ")}>
          I accept the{" "}
          <a href="https://opptly.ai/terms/" rel="noreferrer" target="_blank">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="https://opptly.ai/privacy/" rel="noreferrer" target="_blank">
            Privacy Policy
          </a>
          *
        </p>
      </div>
      <ErrorMessage errors={errors} name={"acceptTerms"} />
      <div className="mt-[10px]">
        <Checkbox
          name="receivesSms"
          label="I consent to receiving SMS communications from Opptly"
          register={register}
          size="lrg"
        />
      </div>
    </div>
  );
}

PolicyAgreements.propTypes = {
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};
