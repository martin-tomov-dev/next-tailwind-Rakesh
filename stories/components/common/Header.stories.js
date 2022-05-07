import React from "react";
import Header from "../../../components/common/Header";

export default {
  title: "components/common/Header",
  component: Header,
};

const template = (args) => <Header {...args} />;

export const Default = {
  args: {
    isSignedIn: false,
    imgSrc: "/images/urbanMeyer.jpg",
    name: "Urban Meyer",
  },
};
