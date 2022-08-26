import { queryName } from "../constant/constant";
import optionalDetailGQLNBE from "./optionalNBEGQL";
import BriklGQL from "./baesGQL";

export const uploadManualNBE = async (formState, dispatch) => {
  console.log("run manual NBE");
  const createProductResponse = await createProductNBE(formState);
  if (createProductResponse.success) {
    const productId = createProductResponse.data.createProduct.id;
    optionalDetailGQLNBE(formState, productId, dispatch);
  }
};

export const createProductNBE = async (formState) => {
  const { token, shopid, nameUS, internalID, price, isActive } = formState;
  const productPrice = price === "" ? 0 : parseInt(price);
  return await BriklGQL(queryName.CREATE_PRODUCT_NBE, token, shopid, {
    input: {
      status: isActive,
      internalId: internalID,
      pricingConfiguration: {
        price: [
          {
            amount: productPrice,
            currencyCode: "USD",
          },
        ],
      },
      titleLocalizations: [
        {
          langCode: "en_US",
          content: nameUS,
        },
      ],
    },
  });
};
