import BriklGQL from "./baesGQL";
import { queryName, actionName } from "../constant/constant";

const fetchLoadmoreNBE = async (formState, dispatch) => {
  await Promise.allSettled([
    getVariantsNBE(formState, dispatch),
    getSaleChannelsNBE(formState, dispatch),
  ]);
};

const getVariantsNBE = async (formState, dispatch) => {
  const { token, shopid } = formState;

  return new Promise(async (resolve) => {
    const data = await BriklGQL(queryName.GET_SHOP_VARIANT_NBE, token, shopid);

    if (!data.success || !data?.data?.productOptions?.edges) {
      console.log("error");
      dispatch({ type: actionName.SET_ERR_LOADMORE });
      resolve();
      return;
    }
    const validVariants = data?.data?.productOptions?.edges
      .filter((variant) => variant.node.defaultTitle)
      .slice(0, 5)
      .map((variant) => {
        const node = variant.node;
        return {
          variantID: node.id,
          variantName: node.defaultTitle,
          options: node.values,
        };
      });
    dispatch({ type: actionName.ADD_ALL_VARIANTS, payload: validVariants });
    resolve();
    return;
  });
};

const getSaleChannelsNBE = async (formState, dispatch) => {
  const { token, shopid } = formState;

  return new Promise(async (resolve) => {
    const data = await BriklGQL(
      queryName.GET_SHOP_STOREFRONT_NBE,
      token,
      shopid,
      {
        first: 5,
        keyword: "",
      }
    );

    if (!data.success) {
      dispatch({ type: actionName.SET_ERR_LOADMORE });
      resolve();
      return;
    }
    const validSaleChannels = data.data?.searchSalesChannels?.edges.map(
      (SC) => {
        const node = SC.node;
        return { id: node.id, name: node.name };
      }
    );
    dispatch({
      type: actionName.ADD_ALL_SALE_CHANNEL,
      payload: validSaleChannels,
    });
    resolve();
    return;
  });
};

export default fetchLoadmoreNBE;
