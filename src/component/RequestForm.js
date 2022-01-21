import React from "react";
import { UploadContext } from "../context/uploadContext";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import styled from "styled-components";
import { FormContext } from "../context/formContext";

const RequestForm = () => {
  const { handleSubmit } = React.useContext(UploadContext);
  const { formState, handleChange, handleLoadmoreOption, handleChangeVariant } =
    React.useContext(FormContext);

  const { shopid, token, isActive } = formState;
  return (
    <Wrapper onSubmit={handleSubmit}>
      <StepOne shopid={shopid} token={token} handleChange={handleChange} />
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
    </Wrapper>
  );
};

const Wrapper = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  column-gap: 1rem;
  row-gap: 5rem;
  button {
    width: 70%;
    margin: auto;
    height: 50px;
    border-radius: 20px;
    font-size: 20px;
    font-weight: bold;
  }
   {
    button:disabled,
    button[disabled] {
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
    }
  }
`;

export default RequestForm;
