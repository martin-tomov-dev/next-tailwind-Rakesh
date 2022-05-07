import { useState } from "react";
import { useAtom } from "jotai";
import { getTitles } from "../../lib/api/ApiClient";
import { userTitlesAtom } from "../../store/userRegistration";
import Button from "../common/Button";
import CategoryInputSelector from "../common/CategoryInputSelector/CategoryInputSelector";

export function AddTitles({ onPrev, onNext }) {
  const [userTitles, setUserTitles] = useAtom(userTitlesAtom);
  const [data, setData] = useState([]);
  const hasMadeSelection = userTitles.length > 0;
  const hasMadeMaxSelection = userTitles.length >= 5;

  //TODO: implement debouncer for performance
  const handleInputChange = async (e) => {
    const [titles, err] = await getTitles(e.target.value);

    if (err) {
      console.warn(`Problem in fetching titles. Err: ${err}`);
      return;
    }

    setData(titles);
  };

  return (
    <div className="mt-[60px]">
      <h1 className="font-avenirBold text-secondary text-center font-bold text-[24px] tablet:text-[30px] -mt-[30px] tablet:mb-[74px] mb-[14px]">
        Add Titles
      </h1>
      <p className="text-[14px] tablet:text-[16px] mb-[10px]">
        Enter up to five titles that most closely fit your career path.
      </p>
      {hasMadeMaxSelection && (
        <p className="text-[14px] italic text-primary my-[5px]">
          **Max selections have been made. Must remove an item to add another.
        </p>
      )}
      <CategoryInputSelector
        atom={userTitles}
        atomSetter={setUserTitles}
        onInputChange={handleInputChange}
        data={data}
        disabled={hasMadeMaxSelection}
        placeholder="Add Title"
      />
      <div className="flex mt-[73px] tablet:mt-[126px]">
        <Button label="Previous" type="secondary" onClick={onPrev} />
        {/* Below is icky - TODO: find ways to override styles */}
        <div className="tablet:-ml-[10px] desktop:-ml-[50px]"></div>
        <Button
          type={!hasMadeSelection ? "disabled" : "primary"}
          label="Next"
          onClick={onNext}
        />
      </div>
    </div>
  );
}
