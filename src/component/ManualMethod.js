import React, { UseEffect } from "react";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useEffect } from "react/cjs/react.development";

const ManualMethod = ({
  handleChange,
  handleLoadmoreOption,
  handleChangeVariant,
  formState,
  resetFormstate,
}) => {
  const { shopid, token, isActive } = formState;

  useEffect(() => {
    resetFormstate();
  }, []);

  return (
    <>
      <StepTwo handleChange={handleChange} isActive={isActive} />
      <StepThree
        {...formState}
        handleLoadmoreOption={handleLoadmoreOption}
        handleChangeVariant={handleChangeVariant}
        handleChange={handleChange}
      />
      <button className="btn" disabled={!shopid || !token ? true : false}>
        UPLOAD
      </button>
    </>
  );
};

export default ManualMethod;
