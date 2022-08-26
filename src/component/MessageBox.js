import React, { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 50%;
  left: 25%;
  display: flex;
  flex-direction: column;

  padding: 20px;
  gap: 12px;
  .msg {
    background-color: rgb(66, 186, 150);
    color: white;
    border-radius: 10px;
  }
`;

const MessageBox = ({ closeMessage, message }) => {
  useEffect(() => {
    let timer = setTimeout(() => closeMessage(), 3000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      {message.map((msg, index) => {
        const { showMessage, type } = msg;

        return (
          <div
            className="msg"
            key={index}
            style={{
              backgroundColor:
                type === "success" ? "rgb(66, 186, 150)" : "rgb(255,51,51)",
            }}
          >
            <h4>{showMessage}</h4>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default MessageBox;
