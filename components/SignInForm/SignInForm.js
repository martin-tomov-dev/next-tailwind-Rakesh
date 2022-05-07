import Router from "next/router";
import { useForm } from "react-hook-form";
import { useFormConfig } from "../common/forms";
import useCognito from "../../lib/hooks/UseCognito";
import Button from "../common/Button";
import PasswordTextBox from "../common/forms/PasswordTextBox";
import TextBox from "../common/forms/TextBox";
import ErrorMessage from "../common/forms/ErrorMessage";
import HeaderText from "../common/HeaderText";
import BodyText from "../common/BodyText";

export default function SignInForm() {
  const { cognitoClient } = useCognito();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm(useFormConfig);

  const onSubmit = async (data) => {
    try {
      var result = await cognitoClient.loginUser(data);
      Router.push("/profile");
    } catch (error) {
      setError("password", { type: "custom", message: error.message });
    }
  };

  return (
    <div>
      <div className="mb-[94px]">
        <HeaderText text="Welcome Back" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <TextBox
          placeholder="Email"
          name="email"
          register={register}
          validations={{
            required: "Email field is required",
            pattern: {
              value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
              message: "Not in correct email pattern",
            },
          }}
        />
        <ErrorMessage errors={errors} name={"email"} />
        <PasswordTextBox
          register={register}
          validations={{ required: "Password field is required" }}
        />
        <ErrorMessage errors={errors} name={"password"} />
        <BodyText text="Forgot your Password?" />
        <div className="self-center pt-[180px]">
          <Button label="LOGIN" type={!isValid ? "disabled" : "primary"} />
        </div>
      </form>
    </div>
  );
}
