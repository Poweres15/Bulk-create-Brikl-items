import BriklGQL from "./baesGQL";
import { queryName, actionName } from "../constant/constant";

const optionalDetailGQL = async (formState, productID, dispatch) => {
  if (formState.isErrorLoadmore) {
    return;
  }
  await Promise.allSettled([
    updateVariantGQL(formState, productID, dispatch),
    addProducToSF(formState, productID, dispatch),
  ]);
};

const updateVariantGQL = async (formState, productId, dispatch) => {
  if (!formState.selectedVariant || !formState.selectedOption) {
    return;
  }
  const { token, shopid } = formState;
  return new Promise(async (resolve) => {
    const variantId = formState.selectedVariant.variantID;
    const optionId = formState.selectedOption;
    const createVariantResponse = await BriklGQL(
      queryName.CREATE_VARIANT,
      token,
      shopid,
      {
        productId,
        variantId,
      }
    );

    if (
      !createVariantResponse.success ||
      !createVariantResponse.data?.createProductVariant?.variant
    ) {
      dispatch({
        type: actionName.ADD_MESSAGE,
        payload: { showMessage: "unsucessfully create variant", type: "error" },
      });
      resolve();
      return;
    }

    const createOptionVariantResponse = await BriklGQL(
      queryName.ADD_VARIANT_OPTION,
      token,
      shopid,
      {
        productId,
        variantId,
        input: {
          options: [optionId],
        },
      }
    );

    if (!createOptionVariantResponse.success) {
      dispatch({
        type: actionName.ADD_MESSAGE,
        payload: {
          showMessage: "unsucessfully create variant options",
          type: "error",
        },
      });
    }
    resolve();
  });
};

const addProducToSF = async (formState, productId, dispatch) => {
  if (!formState.selectedSF) {
    return;
  }
  const { selectedSF: salesChannelId, token, shopid } = formState;
  return new Promise(async (resolve) => {
    const addProductSFResponse = await BriklGQL(
      queryName.ADD_ITEM_SALE_CHANNEL,
      token,
      shopid,
      {
        productId,
        salesChannelId,
      }
    );

    if (!addProductSFResponse.success) {
      dispatch({
        type: actionName.ADD_MESSAGE,
        payload: {
          showMessage: "unsucessfully add Product to Sale Channel",
          type: "error",
        },
      });
    }

    resolve();
  });
};

export default optionalDetailGQL;
