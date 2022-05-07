import { getCognitoInstance } from "../../../lib/cognito/CognitoClient";

export const onClickEvts = {
  facebook: {
    onClick: () => {
      console.log("facebook btn clicked");
    },
  },
  google: {
    onClick: () => {
      console.log("Google btn clicked");
    },
  },
  indeed: {
    onClick: () => {
      console.log("Indeed btn clicked");
    },
  },
  linkedIn: {
    onClick: async () => {
      const cognito = await getCognitoInstance();
      cognito.goToAuthorize("linkedin-shim");
    },
  },
};
