import Avatar from "../components/common/Avatar";
import { PencilIcon } from "@heroicons/react/outline";

function ProfileCard({ user }) {
  return (
    <div className="rounded shadow-4xl relative mt-[46px] tablet:mt-0 max-w-[364px] tablet:max-w-[1060px] desktop:max-w-[1252px] m-auto flex flex-col justify-center tablet:justify-start tablet:flex-row flex-grow bg-white rounded-[3px] px-[10px] pb-[14px] tablet:pt-[7px] tablet:pr-[15px] tablet:pb-[10px] tablet:pl-[21px] desktop:pt-[8px] desktop:pr-[18px] desktop:pb-[12px] desktop:pl-[25px]">
      <Avatar editable src="/images/urbanMeyer.jpg" />
      <ul className="mx-auto tablet:mx-0 pl-0 tablet:pl-[3%] desktop:pl-[5%]">
        <li className="pt-2 desktop:pt-0">
          <p className="font-avenirBold mt-0 tablet:mt-3 text-2xl tablet:text-[26px] desktop:text-[36px]">
            Jonathan M. Ressmone
          </p>
        </li>
        {/* <li className="pt-3 desktop:pt-0">
          <p className="font-openSansBold tablet:italic text-center tablet:text-right mt-0 tablet:mt-3">
            Marketing Manager
          </p>
        </li> */}
      </ul>
      <ul className="pl-0 flex flex-col items-center tablet:items-start mx-auto tablet:mx-0 tablet:pl-[9%] desktop:pl-[143px] pt-0 tablet:pt-3 leading-8 font-openSansBold font-[14px] tablet:font-[16px] desktop:font-[18px]">
        <li>San Diego, CS, USA</li>
        <li>j_m_ressmone@gmail.com</li>
        <li>(437)228-9712</li>
        <li>
          Resume: <span className="font-openSans">JRessmone_Resume.docx</span>
        </li>
      </ul>
      <div className="tablet:ml-auto pt-[10px] absolute right-[15px] top-[8px]">
        <PencilIcon width="25px" height="25px" />
      </div>
    </div>
  );
}

function CategoryBox({ title, user }) {
  return (
    <div className="rounded mt-[23px] shadow-4xl relative w-[100%] tablet:w-[49%] bg-white rounded-[3px] pt-[14px] pr-[11px] pl-[16px] pb-[13px] tablet:pt-[7px] tablet:pr-[15px] tablet:pb-[10px] tablet:pl-[21px] desktop:pt-[8px] desktop:pr-[18px] desktop:pb-[12px] desktop:pl-[25px]">
      <p className="font-avenirBold text-xl tablet:text-[22px] desktop:text-[25px]">
        {title}
      </p>
      <div className="absolute right-[17px] top-[16px]">
        <PencilIcon className="h-6 w-6" />
      </div>
      <ul className="mt-5">
        <li className="text-base desktop:text-xl font-openSansBold">
          Senior Marketing Manager
        </li>
        <li className="text-base desktop:text-xl font-openSans font-semibold">
          ISG Media
        </li>
        <li className="text-base desktop:text-xl italic font-medium">
          August 2019 - present
        </li>
      </ul>
      <ul className="mt-4">
        <li className="text-base desktop:text-xl font-openSansBold">
          Senior Developer
        </li>
        <li className="text-base desktop:text-xl font-openSans font-semibold">
          Wicked Labs
        </li>
        <li className="text-base desktop:text-xl italic font-medium">
          2017 - 2019
        </li>
      </ul>
    </div>
  );
}

export default function ProfileNew() {
  return (
    <>
      <ProfileCard />
      <div className="flex flex-wrap max-w-[364px] justify-between m-auto tablet:max-w-[1060px] desktop:max-w-[1252px]">
        <CategoryBox title="Experince" />
        <CategoryBox title="Education" />
      </div>
    </>
  );
}
