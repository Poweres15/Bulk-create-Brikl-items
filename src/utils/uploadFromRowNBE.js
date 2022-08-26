import { createProductNBE } from "./uploadManualNBE";
import BriklGQL from "./baesGQL";
import { queryName } from "../constant/constant";

const uploadProductFromRowNBE = async (
  rowObject,
  addErrorMsgInResult,
  rowNumber
) => {
  console.log("NBE Bulk");
  return new Promise(async (resolve) => {
    let { isActive } = rowObject;
    isActive = isActive === "TRUE" ? "ACTIVE" : "INACTIVE";
    const createResponse = await createProductNBE({ ...rowObject, isActive });

    if (!createResponse.success) {
      addErrorMsgInResult("Crerate product Error", rowNumber);
      return resolve();
    }

    const productId = createResponse.data.createProduct.id;
    await Promise.allSettled([
      assignVariantFromRowGQLNBE(
        rowObject,
        productId,
        addErrorMsgInResult,
        rowNumber
      ),
      addProducToSFFromRowNBE(
        rowObject,
        productId,
        addErrorMsgInResult,
        rowNumber
      ),
    ]);
    return resolve();
  });
};

const assignVariantFromRowGQLNBE = async (
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
    const addVariantResponse = await BriklGQL(
      queryName.ADD_VARIANT_NBE,
      token,
      shopid,
      {
        id: productId,
        options: [
          {
            id: variantId,
            valueIds: [optionId],
          },
        ],
      }
    );
    if (!addVariantResponse.success) {
      addErrorMsgInResult("Add Variant Options Error", rowNumber);
    }
    return resolve();
  });
};

const addProducToSFFromRowNBE = async (
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
      queryName.ADD_SHOP_STOREFRONT_NBE,
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

export default uploadProductFromRowNBE;
