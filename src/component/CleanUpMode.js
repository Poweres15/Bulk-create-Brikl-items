import React, { useState } from "react";
import styled from "styled-components";
import { cleanLightSettingNBE } from "../utils/cleanUpFunction";

const CleanUpMode = ({ token }) => {
  const [isLoading, setLoading] = useState(false);

  const GetFunction = (dataName) => {
    switch (dataName) {
      case "LIGHT_NBE":
        return cleanLightSettingNBE;
      default:
        return undefined;
    }
  };

  const CleanUpE2E = async (e) => {
    e.preventDefault();
    const func = GetFunction(e.target.name);
    if (!func) {
      console.log("No function found");
      return;
    }
    setLoading(true);
    await func(token);
    setLoading(false);
  };
  return (
    <Wrapper>
      {isLoading ? (
        <h1>...Loading</h1>
      ) : (
        <>
          <button
            className="clean-btn"
            name="LIGHT_NBE"
            onClick={CleanUpE2E}
            disabled={token.length === 0}
          >
            Delete Light Setting NBE
          </button>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .clean-btn {
    margin-bottom: 2em;
  }
`;

export default CleanUpMode;
