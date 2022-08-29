import React, { useState, useEffect } from "react";
import { FormContext } from "../context/formContext";
import styled from "styled-components";
import {
  getFirstTwentyProductNBE,
  loadMoreProduct,
} from "../utils/getProductNBE";
import deleteProductNBE from "../utils/deleteProdyctByIDNBE";

const DeleteProduct = () => {
  const { formState } = React.useContext(FormContext);
  const [deleteProduct, setDeleteProduct] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [displayProduct, setDisplayProduct] = useState([]);
  const [reloadProduct, setReLoadProduct] = useState(false);
  const [nextpage, setNextPage] = useState({
    hasNextPage: false,
    endCursor: "",
  });

  const handleCheckToDelete = (e) => {
    const productId = e.target.value;
    if (deleteProduct.includes(productId)) {
      setDeleteProduct(deleteProduct.filter((id) => id !== productId));
    } else {
      setDeleteProduct([...deleteProduct, productId]);
    }
  };

  const handleDelete = async () => {
    await Promise.all(
      deleteProduct.map(async (productId) => {
        await deleteProductNBE(formState, productId);
        setReLoadProduct(!reloadProduct);
      })
    );
  };

  const handleLoadMoreProduct = async () => {
    if (nextpage.hasNextPage) {
      const response = await loadMoreProduct(formState, nextpage.endCursor);
      const { edges, pageInfo } = response.data.products;
      console.log("existing", displayProduct);
      console.log("new", edges);
      setDisplayProduct([...displayProduct, ...edges]);
      setNextPage({ ...pageInfo });
    }
  };

  useEffect(() => {
    setDeleteProduct([]);

    const getInitialProduct = async () => {
      const { shopid } = formState;
      if (shopid) {
        setNextPage({
          hasNextPage: false,
          endCursor: "",
        });
        setLoading(true);
        const response = await getFirstTwentyProductNBE(formState);
        const { edges, pageInfo } = response.data.products;
        setDisplayProduct(edges);
        setNextPage({ ...pageInfo });
        setLoading(false);
      }
    };

    getInitialProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.shopid, reloadProduct]);

  if (!formState.shopid) {
    return <h1>Please select the shop</h1>;
  }

  return (
    <Wrapper>
      <button
        className="dangerbtn"
        type="button"
        disabled={deleteProduct.length === 0}
        onClick={handleDelete}
      >
        Delete {deleteProduct.length} Products
      </button>

      {isLoading ? (
        <h1>...Loading Product</h1>
      ) : displayProduct.length === 0 ? (
        <h1>No product in this shop</h1>
      ) : (
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
            {displayProduct?.map(({ node }) => {
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
            })}
          </tbody>
        </table>
      )}
      {nextpage.hasNextPage && (
        <button type="button" onClick={handleLoadMoreProduct}>
          Load more
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .dangerbtn {
    width: 30%;
    padding: 1em;
    height: 70px;
  }

  table {
    font-size: 0.8em;
    margin-bottom: 2em;
  }

  thead th:nth-child(1) {
    width: 10%;
  }

  thead th:nth-child(2) {
    width: 10%;
  }

  thead th:nth-child(3) {
    width: 30%;
  }
  thead th:nth-child(4) {
    width: 50%;
  }
`;
export default DeleteProduct;
