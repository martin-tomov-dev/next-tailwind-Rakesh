import SigninButton from "../../../components/common/SigninButton/";

export default {
  title: "components/common/SigninButton",
  component: SigninButton,
  argTypes: {
    type: {
      control: {
        defaultValue: "indeed",
        type: "select",
        options: ["facebook", "indeed", "google", "linkedIn"],
      },
    },
  },
};

const Template = (args) => <SigninButton {...args} />;

export const Default = {
  args: {
    type: "facebook",
    icon: "/images/social/facebook.svg",
    btnText: "Sign in with Facebook",
  },
};
