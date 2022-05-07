import Downshift from "downshift";
import RemoveableLabel from "./RemoveableLabel";

export default function CategoryInputSelector({
  title,
  atom,
  atomSetter,
  data,
  onInputChange,
  disabled,
  placeholder,
  height = "default",
}) {
  const onSelection = (newItem) => {
    if (atom.includes(newItem.title)) {
      return;
    }

    atomSetter((selectedItems) => [...selectedItems, newItem.title]);
  };

  const onRemove = (title) => {
    const itemToRemove = title;
    if (itemToRemove) {
      atomSetter((selectedItems) =>
        selectedItems.filter((i) => i !== itemToRemove)
      );
    }
  };

  const onChange = (e) => {
    if (!e.target.value) {
      return;
    }

    onInputChange(e);
  };

  const containerBaseClasses =
    "tablet:h-[200px] border-t-[1px] p-[11px] border-r-[1px] border-l-[1px] bg-white border-blue-light rounded-[3px] overflow-scroll";

  const heightToApply = (height) => {
    switch (height) {
      case "default":
        return "h-[319px] tablet:h-[209px]";
      case "sm":
        return "h-[193px]";
    }
  };
  const containerClassesToApply = `${containerBaseClasses} ${heightToApply(
    height
  )}`;

  return (
    <Downshift
      onChange={onSelection}
      itemToString={(item) => (item ? item.title : "")}
    >
      {({ getInputProps, getItemProps, isOpen }) => (
        <div className="relative">
          <div className={containerClassesToApply}>
            {title && (
              <h2 className="text-[#000000] font-avenirBold text-[16px] -mb-[3px] text-bold">
                {title}
              </h2>
            )}
            {atom.length > 0 && (
              <ul className="flex flex-wrap">
                {atom.map((item, i) => (
                  <li key={i} className="mt-[11px] mr-[5px]">
                    <RemoveableLabel title={item} onClick={onRemove} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative">
            {isOpen && (
              <ul className="absolute w-full text-secondary font-bold p-[14px] text-[22px] border-[1px] bg-white border-blue-light bottom-[50px] tablet:bottom-[0px] tablet:top-[50px] bg-[#F2F1F1] tablet:bg-[white] tablet:bg-[inherit] max-h-[233px] tablet:max-h-[none] tablet:min-h-[300px] desktop:min-h-[220px] tablet:h-full overflow-scroll z-10">
                {data &&
                  data.map((item, index) => (
                    <li
                      className="text-[18px] mb-[12px] cursor-pointer"
                      key={index}
                      {...getItemProps({ key: index, index, item })}
                    >
                      {item.title}
                    </li>
                  ))}
              </ul>
            )}
            <input
              {...getInputProps({
                placeholder,
                onChange,
              })}
              type="text"
              name="title"
              className="w-full placeholder:italic border-[1px] pl-[16px] py-[14px] text-[14px] tablet:text-[16px] border-blue-light placeholder:text-[#002577] rounded-[2px]"
              disabled={disabled}
            />
          </div>
        </div>
      )}
    </Downshift>
  );
}
