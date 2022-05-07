import { formStyles } from "./formStyles";
export default function TextBox({
  placeholder,
  required,
  name,
  disabled,
  type = "text",
  register,
  validations,
}) {
  const placeholderText = `${placeholder}${required ? " *" : ""}`;
  const inputStyles = formStyles.input.join(" ");
  return (
    <input
      {...register(name, validations)}
      key={name}
      disabled={disabled}
      type={type}
      name={name}
      className={inputStyles}
      placeholder={placeholderText}
    />
  );
}
