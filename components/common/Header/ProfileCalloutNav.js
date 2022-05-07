import PropTypes from "prop-types";
import navLinks from "../../../content/navigation";
import Link from "next/link";

export default function ProfileCalloutNav({ isDropdownOpen }) {
  const classes = [
    "absolute",
    "w-full",
    "z-10",
    "divide-blue-900",
    "divide-y-2",
    "top-28",
    "bg-white",
    "text-right",
    "text-blue-900",
  ];
  const positionVal = isDropdownOpen ? "block" : "hidden";
  classes.push(positionVal);
  return (
    <ul className={classes.join(" ")}>
      {Object.keys(navLinks).map((link) => (
        <li className="py-1 pr-4 border-blue" key={link}>
          <Link href={navLinks[link].linkTo}>{link}</Link>
        </li>
      ))}
    </ul>
  );
}

ProfileCalloutNav.propTypes = {
  isDropdownOpen: PropTypes.bool.isRequired,
};
