import { useForm } from "react-hook-form";
import TextBox from "../common/forms/TextBox";
import Button from "../common/Button";

export function VerificationForm({ onSubmit, onResend }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, touchedFields },
  } = useForm();

  return (
    <div className="mt-[70px]">
      <h2 className="text-1xl pt-4 text-blue-800 font-extrabold mb-[25px]">
        We sent a verification code to your email. Please enter code below:
      </h2>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextBox
          register={register}
          placeholder="Code"
          required
          name="verificationCode"
        />

        <div>
          <div className="mb-[50px]">
            <span
              className="text-sm text-blue-500 cursor-pointer"
              onClick={onResend}
            >
              Resend Code
            </span>
          </div>
          <Button label="Verify" />
        </div>
      </form>
    </div>
  );
}
