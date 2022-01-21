import React from "react";
import styled from "styled-components";

const StepOne = ({ handleChange, isActive }) => {
  return (
    <Wrapper>
      <div>
        <h4>SET_ACTIVE :</h4>
        <div className="radio-box">
          <label htmlFor="huey">
            <input
              type="radio"
              id="huey"
              name="isActive"
              value="ACTIVE"
              onChange={handleChange}
              checked={isActive === "ACTIVE"}
            />
            Active
          </label>
          <label htmlFor="huey">
            <input
              type="radio"
              id="huey"
              name="isActive"
              value="INACTIVE"
              onChange={handleChange}
              checked={isActive !== "ACTIVE"}
            />
            Not Active
          </label>
        </div>
      </div>

      <div>
        <h4>INTERNAL_ID :</h4>
        <input type="text" name="internalID" onChange={handleChange} />
      </div>
      <div>
        <h4>PRODUCT_US_NAME :</h4>
        <input type="text" name="nameUS" onChange={handleChange} />
      </div>

      <div>
        <h4>PRODUCT_PRICE:</h4>
        <label htmlFor="price">
          $
          <input
            type="number"
            name="price"
            id="price"
            onChange={handleChange}
          />
        </label>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: white;
  padding : 10px 40px 40px 40px;
  position: relative;
  text-align: left;
  
  input[type=text]{
  outline: 0;
  border-width: 0 0 2px;
  min-width:100%;
}
input[type=number]{
    height:100%;
    border-width: 0;
}


    .radio-box {
        display : flex ;
        flex-direction: column;
        justify-content: start;
        label {
            height : 30px;
            input {
                margin-right: 1em;
            }
        }
    }

  &::before {
    content: "Step 2 : Main Details";
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
