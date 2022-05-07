import React from "react";
import DividerLine from "../../../components/common/DividerLine";

export default {
  title: "components/common/DividerLine",
  component: DividerLine,
};

const template = (args) => <DividerLine {...args} />;

export const Default = {
  args: {
    text: "OR",
  },
};
