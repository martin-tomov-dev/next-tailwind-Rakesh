import React from "react";
import Button from "../../../components/common/Button";
import * as Icons from "@heroicons/react/outline";

const iconObj = Object.entries(Icons).reduce((agg, [k, v]) => {
  agg[k] = React.createElement(v);
  return agg;
}, {});
iconObj["none"] = null;

export default {
  title: "components/common/Button",
  component: Button,
  argTypes: {
    icon: {
      options: ["none", ...Object.keys(iconObj)],
      mapping: iconObj,
      control: {
        type: "select",
      },
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Click Me",
  icon: null,
};

export const Secondary = Template.bind({});
Secondary.args = {
  secondary: true,
  label: "Click Me",
};
