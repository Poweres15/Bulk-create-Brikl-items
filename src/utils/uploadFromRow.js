import { createProductGQL } from "./mainGQL";
import BriklGQL from "./baesGQL";
import { queryName, actionName } from "../constant/constant";

//Main Function ##################################################
export const uploadProductFromRow = async (
  rowObject,
  addErrorMsgInResult,
  rowNumber
) => {
  console.log("Bulk OBE run");
  return new Promise(async (resolve) => {
    let { isActive } = rowObject;
    isActive = isActive === "TRUE" ? "ACTIVE" : "INACTIVE";
    const createResponse = await createProductGQL({ ...rowObject, isActive });

    if (!createResponse.success) {
      addErrorMsgInResult("Crerate product Error", rowNumber);
      return resolve();
    }
    const { id: productID } = createResponse.data.createProduct;
    await Promise.allSettled([
      updateVariantGQL(rowObject, productID, addErrorMsgInResult, rowNumber),
      addProducToSF(rowObject, productID, addErrorMsgInResult, rowNumber),
    ]);
    return resolve();
  });
};

//ADD Sale Channel ##################################################

const addProducToSF = async (
  rowObject,
  productId,
  addErrorMsgInResult,
  rowNumber
) => {
  if (!rowObject.selectedSF) {
    return;
  }

  const { token, shopid, selectedSF: salesChannelId } = rowObject;

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
      addErrorMsgInResult("Unsuccessful add to Sale channel", rowNumber);
    }

    resolve();
  });
};

//Upload Variant ##################################################

const updateVariantGQL = async (
  rowObject,
  productId,
  addErrorMsgInResult,
  rowNumber
) => {
  if (!rowObject.selectedVariant || !rowObject.selectedOption) {
    return;
  }
  const { token, shopid } = rowObject;
  return new Promise(async (resolve) => {
    const variantId = rowObject.selectedVariant;
    const optionId = rowObject.selectedOption;
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
      addErrorMsgInResult("Create Variant Error", rowNumber);
      return resolve();
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
      addErrorMsgInResult("Add Variant Options Error", rowNumber);
    }
    return resolve();
  });
};
