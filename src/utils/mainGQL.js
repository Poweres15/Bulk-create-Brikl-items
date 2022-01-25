import { queryName, actionName } from "../constant/constant";
import optionalDetailGQL from "./optionalGQL";
import BriklGQL from "./baesGQL";

export const createProductGQL = async (formState) => {
  const { token, shopid, nameUS, internalID, price, isActive } = formState;
  // Default price = 0
  const productPrice = price === "" ? 0 : parseInt(price);
  return await BriklGQL(queryName.CREATE_PRODUCT, token, shopid, {
    shopId: shopid,
    status: isActive,
    input: {
      no: internalID,
      title: {
        id: "9749ff71-f71a-46b8-8583-1f33b820ec09",
        text: [
          {
            langCode: "en_US",
            content: nameUS,
          },
        ],
      },
      price: {
        currency: "USD",
        value: productPrice,
      },
    },
  });
};

const deleteProductGQL = async (formState, productID) => {
  const { token, shopid } = formState;

  return await BriklGQL(queryName.DELETE_PRODUCT, token, shopid, {
    id: productID,
  });
};

export const requestGQLs = async (formState, dispatch) => {
  const createProductResponse = await createProductGQL(formState);
  if (createProductResponse.success) {
    const { id: productID } = createProductResponse.data.createProduct;

    await optionalDetailGQL(formState, productID, dispatch);

    // const deletedResp = await deleteProductGQL(formState, productID);

    // if (!deletedResp.success) {
    //   dispatch({
    //     type: actionName.ADD_MESSAGE,
    //     payload: { showMessage: deletedResp.message, type: "error" },
    //   });
    // }

    // Prevent condition to hit create product Error
    return;
  }

  dispatch({
    type: actionName.ADD_MESSAGE,
    payload: { showMessage: createProductResponse.message, type: "error" },
  });
};
