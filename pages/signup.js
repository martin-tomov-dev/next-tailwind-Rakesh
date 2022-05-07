import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { userRegistrationAtom } from "../store/userRegistration";
import Button from "../components/common/Button";
import PasswordTextBox from "../components/common/forms/PasswordTextBox";
import ErrorMessage from "../components/common/forms/ErrorMessage";
import { useState } from "react";
import TextBox from "../components/common/forms/TextBox";
import { WithAuthLayout } from "../components/common/Layout";
import useCognito from "../lib/hooks/UseCognito";
import Router from "next/router";
import navLinks from "../content/navigation";

function SignUpForm({ onSubmit, errorCode }) {
  const [userRegistration, setUserRegistration] = useAtom(userRegistrationAtom);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, touchedFields },
  } = useForm();

  return (
    <>
      <div className="text-2xl pt-4 text-blue-800 font-extrabold italic">
        Welcome, Lets Get Started!
      </div>

      <div className="pb-4 text-blue-800">* indicates required field</div>

      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextBox
          register={register}
          placeholder="First Name"
          required
          name="firstName"
        />
        <TextBox
          register={register}
          placeholder="Last Name"
          required
          name="lastName"
        />
        <TextBox
          register={register}
          placeholder="Email"
          required
          name="email"
        />
        <PasswordTextBox register={register} required />
        <ErrorMessage errors={errors} name={"password"} />
        <div>
          {errorCode === "UsernameExistsException" ? (
            <Link href="/signin">
              <a>You already have an account. Go ahead and log in!</a>
            </Link>
          ) : (
            <Button className="flex-shrink" label="Sign Up" />
          )}
        </div>
      </form>
    </>
  );
}

function VerificationForm({ onSubmit, onResend }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, touchedFields },
  } = useForm();

  return (
    <>
      <div className="text-2xl pt-4 text-blue-800 font-extrabold italic">
        {
          "We've sent you an email to verify your account. Please enter the code below."
        }
      </div>

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
          <div>
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
    </>
  );
}

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //we need email for verification and we need email+password to log the user in
  //after successful registration. we save this off after they have signed up
  const [{ email, password }, setAuthInfo] = useState({});
  const { cognitoClient, cognitoLoading } = useCognito();
  const [showVerification, setShowVerification] = useState(false);

  const handleSignup = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await cognitoClient.signUp(data);
      if (result.userConfirmed) {
        //do some signing in stuff
      } else {
        setAuthInfo({ email: data.email, password: data.password });
        setShowVerification(true);
      }
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  const handleVerification = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      await cognitoClient.confirmSignUp({
        email,
        verificationCode: data.verificationCode,
      });
      //TODO: there is probably additional stuff to check here.
      //in the eventual case of 2fa, we may end up needing a "bypass 2fa"
      //login, which i imagine cognito makes impossible.... long term
      //we may want to either 1) see if cognito allows an active user session
      //post signup, or 2) monkey around w/ the admin api a bit? we'll have to really
      //investigate this a bit in the future
      await cognitoClient.loginUser({ email, password });
      //TODO: i know rakesh has some resources for this?
      Router.push(navLinks.Profile.linkTo);
    } catch (error) {
      console.error(error);
      //code mismatch, etc
      setError(error);
    }

    setIsLoading(false);
  };

  const handleResend = async (e) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await cognitoClient.resendConfirmation(authInfo);
      console.log(result);
    } catch (error) {
      console.error(error);
      setError(error);
    }

    setIsLoading(false);
  };

  const loadingClasses =
    isLoading || cognitoLoading
      ? "top-0 left-0 h-full w-full absolute bg-slate-400/50 text-center align-middle"
      : "hidden";

  return (
    <div className="flex flex-col justify-center relative">
      <div className={loadingClasses}>Loading...</div>

      {showVerification ? (
        <VerificationForm
          onSubmit={handleVerification}
          onResend={handleResend}
        />
      ) : (
        <SignUpForm onSubmit={handleSignup} errorCode={error && error.code} />
      )}
    </div>
  );
}

WithAuthLayout(SignUp);
