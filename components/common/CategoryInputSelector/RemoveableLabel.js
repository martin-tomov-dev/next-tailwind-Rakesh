export default function RemoveableLabel({ title, onClick }) {
  const handleClick = () => {
    onClick(title);
  };
  return (
    <div className="items-center flex bg-[#515050] rounded-[20px] py-[1px] pl-[13px] tablet:pl-[18px] pr-[4px] w-fit">
      <p className="font-openSansBold text-[12px] tablet:text-[16px] mr-[15px] text-white">
        {title}
      </p>
      <img
        src="/images/closeIcon.png"
        className="w-[22px] h-[19px] my-[2px]"
        alt="title"
        onClick={handleClick}
      />
    </div>
  );
}
