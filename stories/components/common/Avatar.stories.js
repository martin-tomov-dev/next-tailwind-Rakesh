import Avatar from "../../../components/common/Avatar";

export default {
  title: "components/common/Avatar",
  component: Avatar,
};

const Template = (args) => <Avatar {...args} />;

export const Default = {
  args: {
    size: "medium",
    src: "/images/urbanMeyer.jpg",
    editable: false,
  },
};

// export const Editable = {
//     args: {
//         editable: True
//     }
// }
