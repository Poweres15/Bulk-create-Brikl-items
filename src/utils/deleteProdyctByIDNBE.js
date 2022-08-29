import BriklGQL from "./baesGQL";
import { queryName } from "../constant/constant";

const deleteProductNBE = async (formState, productId) => {
  const { token, shopid } = formState;
  console.log(`delete product id ${productId}`);
  return await BriklGQL(queryName.DELETE_PEODUCT_NBE, token, shopid, {
    id: productId,
  });
};

export default deleteProductNBE;
