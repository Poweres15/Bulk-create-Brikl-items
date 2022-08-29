import React from "react";

const DeleteTable = ({
  isLoading,
  displayProduct,
  handleCheckToDelete,
  handleLoadMoreProduct,
  nextpage,
}) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>delete?</th>
            <th>status</th>
            <th>Intenal ID</th>
            <th>Product Name</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <div className="skeleton skeleton-text"></div>
              </td>
              <td>
                <div className="skeleton skeleton-text"></div>
              </td>
              <td>
                <div className="skeleton skeleton-text"></div>
              </td>
            </tr>
          ) : (
            displayProduct?.map(({ node }) => {
              const { id, defaultTitle, internalId, status } = node;
              return (
                <tr key={id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={handleCheckToDelete}
                      value={id}
                    />
                  </td>
                  <td>{status}</td>
                  <td>{internalId || "-"}</td>
                  <td>{defaultTitle}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {nextpage.hasNextPage && (
        <button
          type="button"
          className="btn load-more-product"
          onClick={handleLoadMoreProduct}
        >
          Load more
        </button>
      )}
    </>
  );
};

export default DeleteTable;
