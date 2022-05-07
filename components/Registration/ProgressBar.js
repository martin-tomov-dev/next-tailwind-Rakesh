export function ProgressBar({ titles, activeIndex }) {
  const circleClasses =
    "rounded-[20px] cursor-pointer w-[20px] h-[20px] border border-blue-800";

  return (
    <div className="flex justify-center mt-[30px]">
      <div className="w-[200px] tablet:w-[360px]">
        <div className="flex justify-between">
          {titles.map((t, i) => {
            const lastItem = titles.length - 1;
            const circleClassesToApply = `${circleClasses} ${
              i === activeIndex && "bg-blue-800"
            }`;
            if (i === lastItem) {
              return <div className={circleClassesToApply}></div>;
            } else {
              return (
                <>
                  <div className={circleClassesToApply}></div>
                  <div className="w-[70px] tablet:w-[150px] h-[3px] bg-blue-800 mt-[9px]"></div>
                </>
              );
            }
          })}
        </div>
        <div className="flex justify-between mt-[6px]">
          {titles.map((t, i) => (
            <p
              key={i}
              className="-ml-[20px] tablet:-ml-[32px] text-secondary text-[9px] tablet:text-[12px] text-OpenSans font-bold"
            >
              {t.toUpperCase()}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
