import React from "react";
import { UploadContext } from "../context/uploadContext";
import RequestForm from "../component/RequestForm";
import MessageBox from "../component/MessageBox";
import styled from "styled-components";

const Home = () => {
  const { closeMessage, uploadState } = React.useContext(UploadContext);
  const { isMessageShow, message, isLoading } = uploadState;

  return (
    <>
      {isLoading && (
        <LoadingWrapper>
          <div className="loader"></div>
        </LoadingWrapper>
      )}
      <main>
        <RequestForm />
        {isMessageShow && message.length !== 0 && (
          <MessageBox closeMessage={closeMessage} message={message} />
        )}
      </main>
    </>
  );
};

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  diplay : flex:
  justifycontent: center;
  alignitems: center;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
export default Home;
