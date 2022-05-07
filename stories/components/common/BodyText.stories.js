import React from "react";
import BodyText from "../../../components/common/BodyText";

export default {
  title: "components/common/BodyText",
  component: BodyText,
};

const template = (args) => <BodyText {...args} />;

export const Default = {
  args: {
    text: "I am McLovin.",
  },
};
