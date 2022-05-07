import React from "react";
import { PencilIcon } from "@heroicons/react/outline";
import Avatar from "../common/Avatar";

function PrivacyBubble() {
  return (
    <div className="basis-1 p-7 flex items-center aspect-square rounded-full bg-green-600 text-white font-bold text-center italic uppercase">
      Profile Visible to Others
    </div>
  );
}

export default function ProfileCard({ user, profileData }) {
  const areaCode = profileData.phoneNumber.substring(0, 3);
  const num1 = profileData.phoneNumber.substring(3, 6);
  const num2 = profileData.phoneNumber.substring(6);

  const formattedPhone = `(${areaCode}) ${num1}-${num2}`;

  return (
    <div className="relative flex flex-grow h-48 border-blue-800 border-4 rounded-full">
      <Avatar editable src="/images/urbanMeyer.jpg" />

      <div className="flex px-10 py-5 w-full">
        <div className="p-5 text-right">
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold">
              {user.firstName} {user.lastName}
            </span>
            <br />
          </div>
        </div>
        {/*just a spacer */}
        <div className="flex-grow"></div>
        <div className="flex-grow p-5">
          <div className="flex flex-col justify-between h-full font-semibold text-lg">
            <span>{`${profileData.city}, ${profileData.state}`}, USA</span>
            <span>{user.email}</span>
            <span>{formattedPhone}</span>
          </div>
        </div>
        <PrivacyBubble />
      </div>
      <div className="p-1 absolute h-fit rounded-full border-2 top-[90%] right-[2.5rem] w-[35px] font-black bg-white">
        <PencilIcon />
      </div>
    </div>
  );
}
