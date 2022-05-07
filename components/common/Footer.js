import SocialIcon from "./SocialIcon";
import { socialIcons } from "../../content/socialIcons";

export default function Footer() {
  return (
    <footer className="flex justify-between items-center h-16 px-[53px] bg-primary text-white">
      <div>
        <p>2022 Opptly</p>
      </div>
      <ul className="flex mt-[10px]">
        {Object.keys(socialIcons).map((s) => {
          return (
            <li key={s}>
              <SocialIcon {...socialIcons[s]} />
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
