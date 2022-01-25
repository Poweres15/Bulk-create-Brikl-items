import React, { useState } from "react";
import { UploadContext } from "../context/uploadContext";
import StepOne from "./StepOne";
import styled from "styled-components";
import { FormContext } from "../context/formContext";
import ManualMethod from "./ManualMethod";
import BulkUpload from "./BulkUpload";

const RequestForm = () => {
  const [isBulkMethod, setBulkMethod] = useState(false);
  const { handleSubmit } = React.useContext(UploadContext);
  const {
    formState,
    handleChange,
    handleLoadmoreOption,
    handleChangeVariant,
    resetFormstate,
  } = React.useContext(FormContext);
  const { shopid, token } = formState;
  return (
    <Wrapper onSubmit={handleSubmit}>
      <div className="method-group">
        <button
          className={!isBulkMethod ? "active" : ""}
          type="button"
          onClick={() => {
            setBulkMethod(false);
          }}
        >
          Single Method
        </button>
        <button
          className={isBulkMethod ? "active" : ""}
          type="button"
          onClick={() => {
            setBulkMethod(true);
          }}
        >
          Bulk Method
        </button>
      </div>

      <StepOne shopid={shopid} token={token} handleChange={handleChange} />

      {isBulkMethod ? (
        <BulkUpload />
      ) : (
        <ManualMethod
          handleChange={handleChange}
          handleLoadmoreOption={handleLoadmoreOption}
          handleChangeVariant={handleChangeVariant}
          resetFormstate={resetFormstate}
          formState={formState}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  column-gap: 1rem;
  row-gap: 5rem;
  .method-group {
    display: flex;
    flex-direction: row;

    button {
      border: none;
      border-radius: 0;
      background: rgba(0, 0, 0, 0);
      cursor: pointer;
    }

    .active {
      color: green;
      border-bottom: 5px solid green;
      font-size: 1.4em;
    }
  }
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
