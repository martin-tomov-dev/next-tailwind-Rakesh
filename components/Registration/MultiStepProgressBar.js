import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { current } from "@reduxjs/toolkit";

export function MultiStepProgressBar({ currentStep, steps }) {
  const stepPercentages = steps.map((step, i) => {
    return i === 0 ? 0 : Math.round(100 / (steps.length - 1)) * i;
  });
  const stepPercentage = stepPercentages[currentStep];

  return (
    <ProgressBar
      percent={stepPercentage}
      stepPostions={stepPercentages}
      filledBackground="#002577"
      height={5}
    >
      {steps.map((label, i) => (
        <Step key={i}>
          {({ accomplished, index }) => (
            <>
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              ></div>
              <p className="text-blue text-[9px] tablet:text-[12px] text-OpenSans font-bold -mt[10px]">
                {label}
              </p>
            </>
          )}
        </Step>
      ))}
    </ProgressBar>
  );
}

export default MultiStepProgressBar;
