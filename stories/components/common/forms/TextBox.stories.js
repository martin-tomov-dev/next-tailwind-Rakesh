import TextBox from "../../../../components/common/forms/TextBox";

export default {
  title: "components/common/forms/TextBox",
  component: TextBox,
};

const Template = (args) => <TextBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "placeholder",
  required: true,
};
