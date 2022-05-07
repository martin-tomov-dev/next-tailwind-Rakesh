import CategoryInputSelector from "../../../components/common/CategoryInputSelector/CategoryInputSelector";

export default {
  title: "components/common/CategoryInputSelector",
  component: CategoryInputSelector,
};

const Template = (args) => <CategoryInputSelector {...args} />;

export const Default = {
  args: {
    data: ["A", "B", "C"],
    selectedItems: ["A", "B"],
    onRemove: () => {
      console.log("removeItem");
    },
    onInputChange: () => {
      return ["A", "B", "C"];
    },
  },
};
