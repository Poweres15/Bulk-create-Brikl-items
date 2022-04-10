import BriklGQL from "./baesGQL";
import { queryName, actionName } from "../constant/constant";

const optionalDetailGQLNBE = async (formState, productID, dispatch) => {
  if (formState.isErrorLoadmore) {
    return;
  }
  await Promise.allSettled([
    assignVariantGQLNBE(formState, productID, dispatch),
    addProducToSFNBE(formState, productID, dispatch),
  ]);
};

const assignVariantGQLNBE = async (formState, productID, dispatch) => {
  if (!formState.selectedVariant || !formState.selectedOption) {
    return;
  }

  return new Promise(async (resolve) => {
    const { token, shopid } = formState;
    const variantId = formState.selectedVariant.variantID;
    const optionId = formState.selectedOption;
    const assignVariantResponse = await BriklGQL(
      queryName.ADD_VARIANT_NBE,
      token,
      shopid,
      {
        id: productID,
        options: [
          {
            id: variantId,
            valueIds: [optionId],
          },
        ],
      }
    );

    if (!assignVariantResponse.success) {
      dispatch({
        type: actionName.ADD_MESSAGE,
        payload: { showMessage: "unsucessfully create variant", type: "error" },
      });
      resolve();
      return;
    }
    resolve();
  });
};

const addProducToSFNBE = async (formState, productId, dispatch) => {
  if (!formState.selectedSF) {
    return;
  }
  const { selectedSF: salesChannelId, token, shopid } = formState;
  return new Promise(async (resolve) => {
    const addProductSFResponse = await BriklGQL(
      queryName.ADD_SHOP_STOREFRONT_NBE,
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

export default optionalDetailGQLNBE;
