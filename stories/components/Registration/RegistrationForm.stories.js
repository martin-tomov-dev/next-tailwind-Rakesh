import { RegistrationForm } from "../../../components/Registration/";

export default {
  title: "components/Registration/RegistrationForm",
  component: RegistrationForm,
  args: {},
};

const Template = (args) => <RegistrationForm {...args} />;

export const Default = {
  args: {
    formValues: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@eatmyshorts.com",
    },
  },
};
