import BriklGQL from "./baesGQL";
import { queryName, actionName } from "../constant/constant";

const fetchLoadmore = async (formState, dispatch) => {
  await Promise.allSettled([
    getVariants(formState, dispatch),
    getSaleChannels(formState, dispatch),
  ]);
};

const getVariants = async (formState, dispatch) => {
  const { token, shopid } = formState;
  return new Promise(async (resolve) => {
    const data = await BriklGQL(queryName.GET_SHOP_VARIANT, token, shopid, {
      id: shopid,
    });

    if (!data.success || !data?.data?.shop?.variants?.edges) {
      dispatch({ type: actionName.SET_ERR_LOADMORE });
      resolve();
      return;
    }
    const validVariants = data.data.shop.variants.edges
      .filter((varaint) => varaint.node.title.defaultValue)
      .slice(0, 5)
      .map((variant) => {
        const node = variant.node;
        return {
          variantID: node.id,
          variantName: node.title.defaultValue,
          options: node.options,
        };
      });

    dispatch({ type: actionName.ADD_ALL_VARIANTS, payload: validVariants });

    resolve();
  });
};

const getSaleChannels = async (formState, dispatch) => {
  const { token, shopid } = formState;
  return new Promise(async (resolve) => {
    const data = await BriklGQL(queryName.GET_SHOP_STOREFRONT, token, shopid, {
      shopId: shopid,
    });

    if (!data.success) {
      dispatch({ type: actionName.SET_ERR_LOADMORE });
      resolve();
      return;
    }

    const validSaleChannels = data?.data?.shop?.salesChannels?.edges
      .slice(0, 5)
      .map((SC) => {
        const node = SC.node;
        return { id: node.id, name: node.title.defaultValue };
      });
    dispatch({
      type: actionName.ADD_ALL_SALE_CHANNEL,
      payload: validSaleChannels,
    });

    resolve();
  });
};

export default fetchLoadmore;
