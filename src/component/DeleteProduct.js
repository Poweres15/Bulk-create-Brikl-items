import React, { useState, useEffect } from "react";
import { FormContext } from "../context/formContext";
import styled from "styled-components";
import getFirstTwentyProductNBE from "../utils/getProductNBE";

const DeleteProduct = () => {
  const { formState } = React.useContext(FormContext);
  const [deleteProduct, setDeleteProduct] = useState([]);

  useEffect(() => {
    setDeleteProduct([]);

    const getInitialProduct = async () => {
      const { shopid } = formState;
      if (shopid) {
        const response = await getFirstTwentyProductNBE(formState);
        console.log(response);
      }
    };

    getInitialProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.shopid]);

  if (!formState.shopid) {
    return <h1>Please select the shop</h1>;
  }

  return (
    <Wrapper>
      <button
        className="dangerbtn"
        type="button"
        disabled={deleteProduct.length === 0}
      >
        Delete {deleteProduct.length} Product
      </button>
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
`;
export default DeleteProduct;
