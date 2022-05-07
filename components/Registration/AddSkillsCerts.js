import { useState } from "react";
import { useAtom } from "jotai";
import { userSkillsAtom, userCertAtom } from "../../store/userRegistration";
import { getTitles } from "../../lib/api/ApiClient";
import Button from "../common/Button";
import CategoryInputSelector from "../common/CategoryInputSelector/CategoryInputSelector";

export function AddSkillsCerts({ onPrev, onNext }) {
  const [userSkills, setUserSkills] = useAtom(userSkillsAtom);
  const [userCerts, setUserCerts] = useAtom(userCertAtom);

  const [skillsData, setSkillsData] = useState([]);
  const [certsData, setCertsData] = useState([]);

  const handleSkillsInputChange = async (e) => {
    const [titles, err] = await getTitles(e.target.value);

    if (err) {
      console.warn(`Problem in fetching titles. Err: ${err}`);
      return;
    }

    setSkillsData(titles);
  };

  const handleCertsInputChange = async (e) => {
    const [titles, err] = await getTitles(e.target.value);

    if (err) {
      console.warn(`Problem in fetching titles. Err: ${err}`);
      return;
    }

    setCertsData([{ title: e.target.value }, ...titles]);
  };

  return (
    <div>
      <div className="my-[20px]">
        <h1 className="font-avenirBold text-secondary text-center font-bold text-[24px] tablet:text-[30px] mt-[30px] tablet:mb-[50px] mb-[14px]">
          Add Skills & Certifications
        </h1>
        <p className="mb-[10px]">Enter your relevant skills.</p>
        <CategoryInputSelector
          atom={userSkills}
          atomSetter={setUserSkills}
          onInputChange={handleSkillsInputChange}
          data={skillsData}
          placeholder="Add Skill"
          title="Skills"
          height="sm"
        />
      </div>
      <p className="mb-[10px]">
        Enter any certifications, Affiliations or Awards
      </p>
      <CategoryInputSelector
        atom={userCerts}
        atomSetter={setUserCerts}
        onInputChange={handleCertsInputChange}
        data={certsData}
        placeholder="Add Certification"
        title="Certifications"
        height="sm"
      />
      <div className="flex mt-[30px]">
        <Button label="Previous" onClick={onPrev} type="secondary" />
        <Button label="Next" onClick={onNext} />
      </div>
    </div>
  );
}
