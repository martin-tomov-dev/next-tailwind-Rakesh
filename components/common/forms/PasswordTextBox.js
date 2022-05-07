import { useState } from "react";
import { formStyles } from "./formStyles";

export default function PasswordTextBox({
  name = "password",
  required,
  hidden,
  disabled,
  register,
  validations = { required: "Password field is required" },
}) {
  // TODO: display password requirements
  const inputType = hidden ? "hidden" : "password";
  const inputStyles = formStyles.input.join(" ");
  const [viewPassword, setViewPassword] = useState(false);

  const handleViewPassword = () => {
    setViewPassword((prev) => setViewPassword(!prev));
  };

  return (
    <div className="relative">
      <input
        type={viewPassword ? "text" : inputType}
        disabled={disabled}
        {...register(name, validations)}
        name={name}
        className={inputStyles}
        placeholder={"Password" + (required ? " *" : "")}
      />
      <img
        onClick={handleViewPassword}
        alt="View Password"
        src="/images/viewPasswordIcon.png"
        className="cursor-pointer absolute top-[0px] bottom-[0px] m-auto right-[14px]"
      />
    </div>
  );
}
