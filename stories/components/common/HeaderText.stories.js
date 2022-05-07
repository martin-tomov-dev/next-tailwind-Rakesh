import React from "react";
import HeaderText from "../../../components/common/HeaderText";

export default {
  title: "components/common/HeaderText",
  component: HeaderText,
};

const template = (args) => <HeaderText {...args} />;

export const Default = {
  args: {
    text: "Smelly Cat by Phoebe Buffet",
  },
};
