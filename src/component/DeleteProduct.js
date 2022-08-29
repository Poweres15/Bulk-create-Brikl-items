import React, { useState, useEffect } from "react";
import { FormContext } from "../context/formContext";
import styled from "styled-components";
import {
  getFirstTwentyProductNBE,
  loadMoreProduct,
  searchProduct,
} from "../utils/getProductNBE";
import deleteProductNBE from "../utils/deleteProdyctByIDNBE";
import DeleteTable from "./DeleteTable";
import { AiOutlineSearch } from "react-icons/ai";

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

  const [searchTerm, setSearchTerm] = useState("");

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
      setDisplayProduct([...displayProduct, ...edges]);
      setNextPage({ ...pageInfo });
    }
  };

  const handleSearch = async () => {
    setDeleteProduct([]);
    setLoading(true);
    setNextPage({
      hasNextPage: false,
      endCursor: "",
    });
    const response = await searchProduct(formState, searchTerm);
    const { edges } = response.data.products;
    setDisplayProduct([...edges]);
    setLoading(false);
  };

  useEffect(() => {
    setDeleteProduct([]);

    const getInitialProduct = async () => {
      const { shopid } = formState;
      if (shopid) {
        setSearchTerm("");
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

      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="Please enter at least 3 characters"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="button"
          className="searchButton"
          disabled={searchTerm.length < 3}
          onClick={handleSearch}
        >
          <AiOutlineSearch />
        </button>
        <button
          type="button"
          className="btn resetButton"
          onClick={() => setReLoadProduct(!reloadProduct)}
        >
          Reset
        </button>
      </div>

      <DeleteTable
        isLoading={isLoading}
        displayProduct={displayProduct}
        handleCheckToDelete={handleCheckToDelete}
        handleLoadMoreProduct={handleLoadMoreProduct}
        nextpage={nextpage}
      />
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

  .search {
    padding-top: 2em;
    width: 100%;
    position: relative;
    display: flex;
  }

  .searchTerm {
    width: 80%;
    border: 3px solid #04aa6d;
    border-right: none;
    padding: 5px;
    height: 30px;
    border-radius: 5px 0 0 5px;
    outline: none;
    color: black;
  }

  .searchButton {
    width: 40px;
    height: 46px;
    border: 1px solid #04aa6d;
    background: #04aa6d;
    text-align: center;
    color: #fff;
    border-radius: 0 5px 5px 0;
    font-size: 20px;
    margin: 0;
  }

  .resetButton {
    height: 46px;
    width: 20%;
    margin-left: 5%;
    border-radius: 5px;
    border: 3px solid #04aa6d;
  }

  .load-more-product {
    height: 46px;
    width: 20%;
    margin: auto;
  }
`;
export default DeleteProduct;
