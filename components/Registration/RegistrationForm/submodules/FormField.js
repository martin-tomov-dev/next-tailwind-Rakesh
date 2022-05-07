import PropTypes from "prop-types";
import TextBox from "../../../common/forms/TextBox";
import { formFields } from "../../formFields";

export function FormField({ keyVal, register }) {
  if (!formFields[keyVal]) {
    console.warn(
      `No formField found for value:${keyVal}. Check formFields.js file.`
    );
    return;
  }
  const { name, placeholder, type = "text", validations } = formFields[keyVal];
  return (
    <TextBox
      key={name}
      placeholder={placeholder}
      name={name}
      register={register}
      type={type}
      validations={validations}
    />
  );
}

FormField.proptype = {
  keyVal: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
};
