import { useAtom } from "jotai";
import {
  userRegistrationAtom,
  userSkillsAtom,
  userCertAtom,
  userTitlesAtom,
} from "../store/userRegistration";
import { putProfile } from "../lib/api/ApiClient";
import { useState } from "react";
import Image from "next/image";
import {
  TwoColumnLeft,
  TwoColumnRight,
} from "../components/common/Layouts/TwoColumn";
import { WithAuthLayout } from "../components/common/Layout";
import useCognito from "../lib/hooks/UseCognito";
import Router from "next/router";
import navLinks from "../content/navigation";
import Logo from "../components/common/Logo";
import {
  AddTitles,
  AddSkillsCerts,
  MultiStepProgressBar,
  RegistrationForm,
  VerificationForm,
} from "../components/Registration";

export default function SignUp() {
  const viewStates = ["Registration", "VerificationForm", "Title", "Skills"];
  const progressBarTitles = ["Registration", "Title", "Skills"];
  const [userRegistration, setUserRegistration] = useAtom(userRegistrationAtom);
  const [userSkills, setUserSkills] = useAtom(userSkillsAtom);
  const [userCerts, setUserCerts] = useAtom(userCertAtom);
  const [userTitles, setUserTitles] = useAtom(userTitlesAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewState, setViewState] = useState(viewStates[0]);
  //we need email for verification and we need email+password to log the user in
  //after successful registration. we save this off after they have signed up
  const [{ email, password }, setAuthInfo] = useState({});
  const { cognitoClient, cognitoLoading } = useCognito();
  const [showVerification, setShowVerification] = useState(false);

  const handleSignup = async (data) => {
    setIsLoading(true);
    setError(null);
    const { hasRegisteredWithCognito = false } = userRegistration;

    if (hasRegisteredWithCognito) {
      setUserRegistration({ ...data, hasRegisteredWithCognito: true });
      setViewState(viewStates[2]);
      return;
    }

    try {
      const { firstName, lastName, email, password } = data;
      const result = await cognitoClient.signUp({
        firstName,
        lastName,
        email,
        password,
      });
      if (result.userConfirmed) {
        //do some signing in stuff
      } else {
        setAuthInfo({ email: data.email, password: data.password });
        setUserRegistration({ ...data, hasRegisteredWithCognito: true });
        setViewState(viewStates[1]);
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
      setViewState(viewStates[2]);
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
      const { email, password } = userRegistration;

      if (!email || !password) {
        console.warn("No email or password found. Try again.");
        return;
      }
      const result = await cognitoClient.resendConfirmation({
        email,
        password,
      });
    } catch (error) {
      console.error(error);
      setError(error);
    }

    setIsLoading(false);
  };

  const handleRegistration = async () => {
    const fieldsToExclude = [
      "acceptTerms",
      "confirmPassword",
      "email",
      "firstName",
      "hasRegisteredWithCognito",
      "lastName",
      "password",
    ];
    const parsedUserRegistration = Object.keys(userRegistration).reduce(
      (ac, cv) => {
        if (fieldsToExclude.includes(cv)) {
          return ac;
        }
        if (cv === "preferredWorkStyles" && userRegistration[cv] === false) {
          return { ...ac, [cv]: [] };
        }
        return { ...ac, [cv]: userRegistration[cv] };
      },
      { employment: [], education: [] }
    );
    const payload = {
      ...parsedUserRegistration,
      skills: userSkills,
      certifications: userCerts,
      titles: userTitles,
    };
    try {
      const result = await putProfile(payload);
      Router.push("/profile");
    } catch (err) {
      console.warn(
        `Trouble adding new userProfile. Error: ${JSON.stringify(
          err
        )} Payload: ${JSON.stringify(payload)}`
      );
    }
  };

  const toggleViewState = () => {
    switch (viewState) {
      case viewStates[0]:
        return (
          <RegistrationForm
            onSubmit={handleSignup}
            errorCode={error && error.code}
            formValues={userRegistration}
          />
        );
      case viewStates[1]:
        return (
          <VerificationForm
            onSubmit={handleVerification}
            onResend={handleResend}
          />
        );
      case viewStates[2]:
        return (
          <AddTitles
            onPrev={() => setViewState(viewStates[0])}
            onNext={() => setViewState(viewStates[3])}
          />
        );
      case viewStates[3]:
        return (
          <AddSkillsCerts
            onPrev={() => setViewState(viewStates[2])}
            onNext={handleRegistration}
          />
        );
    }
  };
  return (
    <div className="flex">
      <TwoColumnLeft>
        <Logo height="90px" width="293px" />
        <div className="max-w-[350px] mx-auto mt-[43px] mb-[80px]">
          <MultiStepProgressBar
            steps={["Register", "Verify", "Titles", "Skills"]}
            currentStep={viewStates.indexOf(viewState)}
          />
        </div>
        {toggleViewState()}
      </TwoColumnLeft>
      <TwoColumnRight>
        <div>
          <Image
            alt="Working with Computer"
            src="/images/landingImg.jpg"
            layout="fill"
            quality={100}
          />
        </div>
      </TwoColumnRight>
    </div>
  );
}

WithAuthLayout(SignUp);
