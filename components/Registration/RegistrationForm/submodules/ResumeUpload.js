import Image from "next/image";

export function ResumeUpload() {
  return (
    <div>
      <p className="font-bold mb-[0px] tablet:mb-[8px] desktop:mb-[0px] -mt-[10px] desktop:-mt-[0px] text-[11px] tablet:text-[12px] desktop:text-[14px]">
        Attach a resume:
      </p>
      <div className="flex items-center border-[0.5px] border-blue-light bg-white p-[7px] tablet:p-[8px] desktop:p-[11px]">
        <button className="w-[113px] h-[27px] tablet:w-[128px] tablet:h-[30px] desktop:w-[173px] desktop:h-[41px] rounded-[3px] text-white bg-[#002577] mr-[42px] text-[11px] tablet:text-[12px] desktop:text-[14px]">
          CHOOSE FILE
        </button>
        <div className="flex content-center hidden">
          <div className="relative h-[47px] w-[47px]">
            <Image
              alt="resume icon"
              src="/images/resumeDoc.svg"
              width="100%"
              height="100%"
            />
          </div>
          <p className="text-[11px] self-center tablet:text-[12px] desktop:text-[14px]">
            Jordan_Resume.docx
          </p>
        </div>
      </div>
    </div>
  );
}
