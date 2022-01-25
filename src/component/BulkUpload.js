import React, { useState, useEffect } from "react";
import {
  initiatlGoogleShee,
  getRowsFromGoogleSheet,
} from "../utils/googleSheet";
import { FormContext } from "../context/formContext";
import { uploadProductFromRow } from "../utils/uploadFromRow";
import ResultTable from "./ResultTable";
import { SiGooglesheets } from "react-icons/si";
import styled from "styled-components";
const fetchErrorMsg = {
  GOOGLE_AUTHORIZATION: "Google Sheet Authorization Error",
};

const googleFormLink = `https://docs.google.com/spreadsheets/d/1VayqQAGlFq0mNJ2HCinGzPJWUhqmrNTTajL_asWzkVs/edit#gid=0`;

const BulkUpload = () => {
  const { formState } = React.useContext(FormContext);
  const [isResultShow, setResultShow] = useState(false);
  const [uploadResult, setUploadResult] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [googleSheet, setGoogleSheet] = useState("");
  const [isError, setError] = useState({ status: false, message: "" });

  const addAPIError = (msg) => {
    setError({ status: true, message: msg });
  };

  useEffect(() => {
    const authorizedGoogleSheet = async () => {
      try {
        setLoading(true);
        const data = await initiatlGoogleShee();
        setGoogleSheet(data);
      } catch (e) {
        console.log(e);
        addAPIError(fetchErrorMsg.GOOGLE_AUTHORIZATION);
      } finally {
        setLoading(false);
      }
    };
    authorizedGoogleSheet();
  }, []);

  const handleUpload = async () => {
    setUploadResult({});
    setResultShow(false);
    setLoading(true);
    const rows = await getRowsFromGoogleSheet(googleSheet);
    const promiseArray = await upLoadAllProduct(rows, formState);
    await Promise.allSettled(promiseArray);
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoading && Object.keys(uploadResult).length !== 0) {
      setResultShow(true);
    }
  }, [isLoading]);

  const addErrorMsgInResult = (msg, rowIndex) => {
    setUploadResult((prev) => {
      return {
        ...prev,
        [rowIndex]: [...prev[rowIndex], msg],
      };
    });
  };

  const upLoadAllProduct = async (rows, formState) => {
    const { token, shopid } = formState;
    const rowLength = rows.length > 5 ? 5 : rows.length;
    const promiseArray = [];
    for (let i = 0; i < rowLength; i++) {
      setUploadResult((prev) => {
        return { ...prev, [i]: [] };
      });
      promiseArray.push(
        uploadProductFromRow(
          { ...rows[i], token, shopid },
          addErrorMsgInResult,
          i
        )
      );
    }
    return promiseArray;
  };

  return (
    <Wrapper>
      <div className="bulk-form">
        <a target="_blank" rel="noopener noreferrer" href={googleFormLink}>
          <SiGooglesheets color="green" size="200px" />
        </a>
        <article>
          <h2>Step to upload bulk order</h2>
          <ul>
            <li>Click Google Form logo to go to Upload Sheet</li>
            <li>Do not edit anything on the header row (Row 1)</li>
            <li>Editable rows are range between row 2- 6 </li>
            <li>Click Upload button below to upload</li>
          </ul>
        </article>
      </div>
      {isLoading ? (
        <h4>...Loading</h4>
      ) : (
        <button
          className="btn"
          type="button"
          disabled={
            isError.status &&
            isError.message === fetchErrorMsg.GOOGLE_AUTHORIZATION
          }
          onClick={handleUpload}
        >
          Upload Bulk items
        </button>
      )}

      {isResultShow && <ResultTable uploadResult={uploadResult} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  * {
    flex: 1;
  }

  .btn {
    width: 30%;
    padding: 1em;
    height: 70px;
  }

  .bulk-form {
    width: 100%;
    display: flex;
    flex-direction: row;

    ul {
      text-align: left;
      line-height: 1.5;
    }

    SiGooglesheets::hover {
      transform: scale(1.2);
    }

    h2 {
      text-align: left;
    }
    margin-bottom: 2em;
  }
`;

export default BulkUpload;
