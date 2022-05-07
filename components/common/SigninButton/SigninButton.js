import PropTypes from "prop-types";
import Image from "next/image";
import { onClickEvts } from "./onClickEvts";

export default function SigninButton({ type }) {
  const classes = [
    "flex",
    "items-center",
    "w-full",
    "px-[19px]",
    "py-[8px]",
    "font-openSans",
    "text-white",
    "bg-blue",
    "rounded-[3px]",
  ];
  const { onClick } = onClickEvts[type];
  const capitalType = `${type.charAt(0).toUpperCase()}${type.slice(1)}`;

  if (!onClick) {
    console.warn(
      `No onClickEvt found for type: ${type}. Check onClickEvts config.`
    );
    return null;
  }

  return (
    <button className={classes.join(" ")} onClick={onClick} type="button">
      <Image
        width={30}
        height={30}
        objectFit="contain"
        src={`/images/social/${type}.svg`}
        alt={`${type}-img`}
      />
      <p className="ml-5 w-[100%] border-l-[3px] text-openSans text-[13px] tablet:text-[14px] desktop:text-[18px] text-md font-bold">{`Sign in with ${capitalType}`}</p>
    </button>
  );
}

SigninButton.propTypes = {
  type: PropTypes.string.isRequired,
};
