import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import ProfileCalloutNav from "./ProfileCalloutNav";
import Avatar from "../Avatar";

export function ProfileCallout({ imgSrc, name }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const clickOutsideElem = useRef(null);
  const profileCallout = useRef(null);

  const handleDropdown = () => {
    setIsDropdownOpen((isDropdownOpen) => !isDropdownOpen);
  };

  useEffect(() => {
    clickOutsideElem.current = (e) => {
      const hasClickedOnElem = profileCallout.current.contains(e.target);
      if (!hasClickedOnElem) {
        setIsDropdownOpen(false);
        document.removeEventListener("click", clickOutsideElem.current);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", clickOutsideElem.current);
    }

    return () =>
      document.removeEventListener("click", clickOutsideElem.current);
  }, [isDropdownOpen]);

  return (
    <div className="relative pr-8" ref={profileCallout}>
      <div className="flex">
        <Avatar src={imgSrc} size="medium" />
        <button className="ml-3.5 underline" onClick={handleDropdown}>
          {name}
        </button>
      </div>
      <ProfileCalloutNav isDropdownOpen={isDropdownOpen} />
    </div>
  );
}

ProfileCallout.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
