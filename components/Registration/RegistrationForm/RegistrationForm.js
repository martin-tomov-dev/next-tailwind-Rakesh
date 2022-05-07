import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormConfig } from "../../common/forms";
import { formFields } from "../formFields";
import HeaderText from "../../common/HeaderText";
import Button from "../../common/Button";
import { Checkbox } from "../../common/forms";
import TextBox from "../../common/forms/TextBox";
import ErrorMessage from "../../common/forms/ErrorMessage";
import {
  Address,
  FormField,
  PasswordConfirmation,
  PolicyAgreements,
  PreferredWorkstyles,
  ResumeUpload,
} from "..";
import { DropdownSelect } from "../../common/forms";
import { levelOfEducation } from "../content/levelOfEducation";

export function RegistrationForm({ formValues, onSubmit, errorCode }) {
  const {
    clearErrors,
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    watch,
    setError,
  } = useForm({
    ...useFormConfig,
    defaultValues: formValues,
  });
  const watchFields = watch(["password", "confirmPassword"]);

  const submit = (data) => {
    const parsedData = Object.keys(data).reduce((ac, cv) => {
      const val = data[cv];
      return { ...ac, [cv]: val === "" ? null : val };
    }, {});
    onSubmit(parsedData);
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const { confirmPassword, password } = value;

      if (confirmPassword) {
        if (confirmPassword !== password) {
          setError("confirmPassword", {
            type: "custom",
            message: "Passwords should match!",
          });
        } else {
          clearErrors(["confirmPassword.custom"]);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, clearErrors, setError]);

  return (
    <div className="px-[17px]">
      <div className="mt-[50px] mb-[22px]">
        <HeaderText text="Register" />
      </div>
      <form
        className="flex flex-col space-y-4 tablet:space-y-3 desktop:space-y-4"
        onSubmit={handleSubmit(submit)}
      >
        <div className="tablet:pb-0 text-blue-800 text-[11px] tablet:text-[12px] desktop:text-[14px]">
          * indicates required field
        </div>
        <FormField keyVal="firstName" register={register} />
        <ErrorMessage errors={errors} name={"firstName"} />

        <FormField keyVal="lastName" register={register} />
        <ErrorMessage errors={errors} name={"lastName"} />

        <FormField keyVal="email" register={register} />
        <ErrorMessage errors={errors} name={"email"} />

        <Address errors={errors} register={register} />

        <FormField keyVal="phoneNumber" register={register} />
        <ErrorMessage errors={errors} name={"phoneNumber"} />
        <div className="w-full">
          <DropdownSelect
            name="levelOfEducation"
            register={register}
            options={levelOfEducation}
            validations={{ required: "Must select State." }}
          />
        </div>

        <PreferredWorkstyles register={register} />

        <div className="flex -pt-[7px]">
          <FormField keyVal="hourlyRate" register={register} />
          <span className="mt-[12px] desktop:mt-[15px] font-bold mx-[15px] text-[11px] tablet:text-[12px] desktop:text-[14px]">
            OR
          </span>
          <FormField keyVal="yearlySalary" register={register} />
        </div>

        <div className="flex justify-center pt-[0px] tablet:pt-[20px] pb-[0px] tablet:pb-[20px]">
          <Checkbox
            name="rateNegotiation"
            label="I am open to rate negotiation"
            register={register}
            validations={{}}
          />
        </div>

        <ResumeUpload />
        <PasswordConfirmation
          errors={errors}
          register={register}
          getValues={getValues}
        />

        <PolicyAgreements register={register} errors={errors} />
        <div>
          {errorCode === "UsernameExistsException" ? (
            <Link href="/">
              <a>You already have an account. Go ahead and log in!</a>
            </Link>
          ) : (
            <Button
              type={!isValid ? "disabled" : "primary"}
              className="flex-shrink"
              label="Next"
            />
          )}
        </div>
      </form>
    </div>
  );
}
