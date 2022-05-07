import Router from "next/router";
import { useForm } from "react-hook-form";
import Button from "../components/common/Button";
import PasswordTextBox from "../components/common/forms/PasswordTextBox";
import TextBox from "../components/common/forms/TextBox";
import ErrorMessage from "../components/common/forms/ErrorMessage";
import { WithAuthLayout } from "../components/common/Layout";
import useCognito from "../lib/hooks/UseCognito";

export default function SignIn() {
  const { cognitoClient } = useCognito();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, touchedFields },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      var result = await cognitoClient.loginUser(data);
      Router.push("/profile");
    } catch (error) {
      //TODO: handle auth errors.
    }
  };

  return (
    <div className="flex flex-col pt-8">
      <div className="flex justify-center">
        <h1 className="text-4xl pb-8 text-blue-800 italic font-extrabold">
          Welcome Back
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
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
        <div className="self-center">
          <Button label="Sign In" />
        </div>
      </form>
    </div>
  );
}

WithAuthLayout(SignIn);
