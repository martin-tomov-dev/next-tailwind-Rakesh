import { useState } from "react";
import { WithAuthLayout } from "../components/common/Layout";
import SignInForm from "../components/SignInForm/SignInForm";
import { RegistLandForm } from "../components/Registration";
import ToggleSwitch from "../components/ToggleSwitch/ToggleSwitch";
import Logo from "../components/common/Logo";
import useUser from "../lib/hooks/UseUser";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const { user, loading } = useUser(null);

  const { replace } = useRouter();
  const viewStates = ["Register", "Login"];
  const [viewState, setViewState] = useState(viewStates[0]);

  if (user) {
    replace("/profile");
  }
  if (user || loading) {
    return <></>;
  }

  const handleViewStateChng = (e) => {
    setViewState(e.target.value);
  };

  const toggleViewState = () => {
    switch (viewState) {
      case viewStates[0]:
        return <RegistLandForm />;
      case viewStates[1]:
        return <SignInForm />;
      default:
        console.warn(`No view state found for value ${viewState}.`);
        return null;
    }
  };

  return (
    <div className="flex m-auto">
      <div className="w-full bg-cover bg-no-repeat bg-[url('/images/landingImg.jpg')] tablet:bg-none">
        <div className="pt-[77px] tablet:mt-[28px] tablet:py-[0px] tablet:m-auto tablet:h-full tablet:pt-[30px] mobile:px-[104px] pb-[84px] px-[32px] bg-white/50">
          <div className="tablet:w-full tablet:max-w-[500px] m-auto">
            <div className="m-auto">
              <Logo height="90px" width="293px" />
              <ToggleSwitch
                labels={[...viewStates]}
                onChange={handleViewStateChng}
                checkedVal={viewState}
              />
            </div>
            {toggleViewState()}
          </div>
        </div>
      </div>
      <div className="h-screen w-full relative hidden tablet:block">
        <div>
          <Image
            alt="Working with Computer"
            src="/images/landingImg.jpg"
            layout="fill"
            quality={100}
            className="h-screen"
          />
        </div>
      </div>
    </div>
  );
}

WithAuthLayout(Home);
