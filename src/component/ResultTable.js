import React from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const ResultTable = ({ uploadResult }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Row Number</th>
          <th>Succesful</th>
          <th>Error Details</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(uploadResult).map((key) => {
          const rowNumber = parseInt(key) + 1;
          const msg = uploadResult[key].join(" , ");
          const Succesful = uploadResult[key].length === 0;
          console.log(Succesful);
          return (
            <tr key={key}>
              <td>{rowNumber}</td>
              <td>
                {Succesful ? (
                  <AiFillCheckCircle color="green" />
                ) : (
                  <AiFillCloseCircle color="red" />
                )}
              </td>
              <td>{msg}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ResultTable;
