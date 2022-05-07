import PropTypes from "prop-types";

// TODO: Mk dividing line an image to make it responsive
export default function DividerLine({ text }) {
  return (
    <div className="flex justify-between pb-[30px] h-[75px] overflow-hidden">
      <div className="text-[30px] w-[45%] overflow-hidden">
        -----------------------
      </div>
      <div className="font-bold mt-[16px] tablet:mt-[13px] text-[11px] tablet:text-[12px] desktop:text-[14px]">
        {text}
      </div>
      <div className="text-[30px] w-[45%] overflow-hidden text-right">
        -----------------------
      </div>
    </div>
  );
}

DividerLine.propTypes = {
  text: PropTypes.string.isRequired,
};
