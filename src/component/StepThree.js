import React from "react";
import styled from "styled-components";

const StepThree = ({
  isLoadingforMore,
  showLoadMore,
  handleLoadmoreOption,
  isErrorLoadmore,
  allVariants,
  selectedVariant,
  handleChangeVariant,
  handleChange,
  selectedOption,
  allSaleChannel,
}) => {
  if (isLoadingforMore) return <h1>...Loading More</h1>;

  if (!showLoadMore)
    return (
      <BtnWrapper>
        {isErrorLoadmore && (
          <p>Unable to load more.Please check your token and shopid</p>
        )}
        <button className="btn" onClick={handleLoadmoreOption}>
          Load more optional details...
        </button>
      </BtnWrapper>
    );

  return (
    <Wrapper>
      <div>
        <h4>Select Variant :</h4>
        <select
          id="selectedVariant"
          name="selectedVariant"
          onChange={handleChangeVariant}
          defaultValue=""
        >
          <option value="" disabled="disabled">
            Please select the Variants
          </option>
          {allVariants.map((variant) => {
            const { variantID, variantName } = variant;
            return (
              <option value={variantID} key={variantID}>
                {variantName}
              </option>
            );
          })}
        </select>
      </div>

      {selectedVariant && (
        <div>
          <h4>Select Variant Option :</h4>
          <select
            name="selectedOption"
            onChange={handleChange}
            value={selectedOption}
          >
            <option value="" disabled="disabled">
              Please select the Options
            </option>

            {selectedVariant.options.map((option) => {
              const { id, value } = option;
              return (
                <option value={id} key={id}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      )}
      <div>
        <h4>Select Sale Channel :</h4>
        <select name="selectedSF" onChange={handleChange} defaultValue="">
          <option value="" disabled="disabled">
            Please select the Sale Channels
          </option>
          {allSaleChannel.map((options) => {
            const { id, name } = options;
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
  padding: 10px 40px 40px 40px;
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: column;

  select {
    font-size: 15px;
    width: 50%;
    height: 40px;
    text-indent: 10px;
    border-radius: 10px;
  }

  &::before {
    content: "Step 3 : Optional Details";
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: white;
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    color: hsl(210, 22%, 49%);

    font-size: 1rem;
  }
`;

const BtnWrapper = styled.section`
  .btn {
    width: 40%;
    height: 50px;
    padding: 0;
    border: none;
    background: none;
    font-size: 25px;
    font-weight: normal;
  }
  .btn:hover {
    color: #4caf50;
    transform: scale(1.5);
  }
  p {
    color: red;
  }
`;

export default StepThree;
