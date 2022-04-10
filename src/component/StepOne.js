import React from "react";
import styled from "styled-components";
import shops from "../constant/shop";
import { BsCheckCircle } from "react-icons/bs";

const StepOne = ({ shopid, token, handleChange }) => {
  return (
    <Wrapper>
      <div>
        <h4>TOKEN :</h4>

        {token.length > 0 ? (
          <p className="Token">
            <BsCheckCircle /> Token has been generated
          </p>
        ) : (
          <p className="Token-wait">...Generating Token </p>
        )}
      </div>
      <div>
        <h4>Select Shop :</h4>
        <select
          id="selectedShop"
          name="selectedShop"
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" disabled="disabled">
            Please select the Shops
          </option>
          {shops.map((shop) => {
            const { id, be, name } = shop;
            return (
              <option value={id} key={id}>
                {name}
              </option>
            );
          })}
        </select>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: white;
  padding : 10px 40px 40px 40px;
  position: relative;
  text-align: left;
  input {
  outline: 0;
  border-width: 0 0 2px;
  min-width:100%;
}
  .Token {
    color: green;
    font-weight: bold;
  }

  .Token-wait {
    color: orange ;
    font-weight: bold;
  }

  &::before {
    content: "Step 1 : Mandatory";
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: white;
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    color:hsl(210, 22%, 49%);
  
    font-size: 1rem;
`;

export default StepOne;
