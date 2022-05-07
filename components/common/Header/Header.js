import PropTypes from "prop-types";
import { ProfileCallout } from "./ProfileCallout";

export default function Header({ isSignedIn, imgSrc, name }) {
  return (
    <header className="flex bg-blue-900 text-white justify-between items-center pl-8 h-28">
      <h1 className="text-5xl">Brand</h1>
      {isSignedIn && <ProfileCallout imgSrc={imgSrc} name={name} />}
    </header>
  );
}

Header.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  imgSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
