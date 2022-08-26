import BriklGQL from "./baesGQL";
import { queryName } from "../constant/constant";

const getFirstTwentyProductNBE = async (formState) => {
  const { token, shopid } = formState;
  return await BriklGQL(queryName.GET_PRODUCT_NBE, token, shopid, {
    filter: {
      types: ["CUSTOM", "DIGITAL", "STOCK"],
    },
    first: 20,
  });
};

export default getFirstTwentyProductNBE;
