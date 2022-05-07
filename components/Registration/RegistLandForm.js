import Router from "next/router";
import { useForm } from "react-hook-form";
import { useFormConfig } from "../common/forms";
import { useAtom } from "jotai";
import { userRegistrationAtom } from "../../store/userRegistration";
import { FormField } from "./";
import Button from "../common/Button";
import ErrorMessage from "../common/forms/ErrorMessage";
import SigninButton from "../common/SigninButton/SigninButton";
import DividerLine from "../common/DividerLine";

export function RegistLandForm() {
  const signInBtns = ["indeed", "linkedIn", "google", "facebook"];
  const [userRegistration, setUserRegistration] = useAtom(userRegistrationAtom);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm(useFormConfig);

  const onSubmit = (data) => {
    setUserRegistration(data);
    Router.push("/signupNew");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-2 tablet:space-y-3"
    >
      <div className="flex">
        <FormField keyVal="firstName" register={register} />
        <FormField keyVal="lastName" register={register} />
      </div>
      <ErrorMessage errors={errors} name={"firstName"} />
      <ErrorMessage errors={errors} name={"lastName"} />

      <FormField keyVal="email" register={register} />
      <ErrorMessage errors={errors} name={"email"} />

      <div className="self-center pt-[40px] tablet:pt-[37px] desktop:pt-[48px] pb-[28px]">
        <Button label="CONTINUE" type={!isValid ? "disabled" : "primary"} />
      </div>
      <DividerLine text="OR" />
      <ul>
        {signInBtns.map((signIn) => (
          <li
            key={signIn}
            className="mb-[28px] tablet:mb-[22px] desktop:mb-[28px]"
          >
            <SigninButton type={signIn} />
          </li>
        ))}
      </ul>
    </form>
  );
}
