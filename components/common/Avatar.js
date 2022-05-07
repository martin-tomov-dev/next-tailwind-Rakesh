import { PencilIcon } from "@heroicons/react/outline";
import Image from "next/image";

/**
 * by default, the avatar will be square, fully rounded, and fit the height of the container it is placed within
 *
 * @param {
 *  src: String
 * } props
 * @returns
 */

export default function Avatar({ src, editable, size }) {
  const getHeight = () => {
    if (size === "small") {
      return "h-[149px]";
    }
    if (size === "medium") {
      return "h-20";
    }

    if (size === "large") {
      return "h-48";
    }

    return "h-100";
  };
  return (
    <div
      className={`relative mt-[-46px] m-auto tablet:m-0 desktop:m-0 h-[126px] w-[126px] desktop:h-[149px] desktop:w-[149px] aspect-square rounded-full`}
    >
      <Image
        className="h-full aspect-square rounded-full"
        src={src}
        alt="Avatar"
        layout="fill"
      />
      {editable && (
        <div className="p-1 absolute h-fit rounded-full border-2 border-black left-[72%] top-[72%] w-[30px] desktop:w-[36px] font-black bg-white">
          <PencilIcon />
        </div>
      )}
    </div>
  );
}
