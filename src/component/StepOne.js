import React from "react";
import styled from "styled-components";

const StepOne = ({ shopid, token, handleChange }) => {
  return (
    <Wrapper>
      <div>
        <h4>SHOP_ID :</h4>
        <input
          type="text"
          id="shopid"
          name="shopid"
          value={shopid}
          onChange={handleChange}
        />
      </div>

      <div>
        <h4>TOKEN :</h4>

        <input name="token" onChange={handleChange} value={token} />
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
