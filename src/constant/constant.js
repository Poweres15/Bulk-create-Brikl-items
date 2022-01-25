const oldBeUrl = "https://dev.api.mybrikl.com/graphql";

export const queryName = {
  GET_PRODUCT: "getProduct",
  CREATE_PRODUCT: "createProduct",
  DELETE_PRODUCT: "deleteProduct",
  UPDATE_VARIANT: "updateProductVariant",
  CREATE_VARIANT: "createProductVariant",
  ADD_VARIANT_OPTION: "updateProductVariant",
  GET_SHOP_VARIANT: "getShopVariantOptions",
  GET_SHOP_STOREFRONT: "getShopSalesChannels",
  ADD_ITEM_SALE_CHANNEL: "createProductSalesChannel",
};

export const actionName = {
  ADD_MESSAGE: "addMessage",
  CLEAR_MESSAGE: "clearMessage",
  RUN_LOADING: "runLoading",
  STOP_LOADING: "stopLoading",
  UPDATE_VALUE: "updateValue",
  SHOW_MESSAGE: "showMessage",
  HIDE_MESSAGE: "hideMessage",
  SET_ERR_LOADMORE: "setErrorLoadMore",
  REMOVE_ERR_LOADMORE: "removeErrorLoadMore",
  ADD_ALL_VARIANTS: "addAllVariants",
  SELECT_VARIANT: "selectedVarant",
  SHOW_LOADMORE: "showLoadMore",
  RUN_LOADING_LOADMORE: "runLoadingLoadMore",
  STOP_LOADING_LOADMORE: "stopLoadingLoadMore",
  ADD_ALL_SALE_CHANNEL: "addAllSaleChannels",
  RESET_FORM_STATE: "resetFormState",
};

export const queryInfo = {
  getProduct: {
    query: `query getProduct($productId: ID!) {
  product(id: $productId) {
    ...productReviewFields
    __typename
  }
}

fragment productReviewFields on Product {
  id
  shopId
  name
}`,
    urlEndPoint: oldBeUrl,
  },
  createProduct: {
    query: `mutation createProduct($shopId: ID!, $status: ProductStatus!, $input: ProductCreateInput) {
  createProduct(shopId: $shopId, status: $status, input: $input) {
    id
    no
  }
}`,
    urlEndPoint: oldBeUrl,
  },
  deleteProduct: {
    query: `mutation deleteProduct($id: ID!) {
  deleteProduct(id: $id)
}`,
    urlEndPoint: oldBeUrl,
  },
  updateProductVariant: {
    query: `mutation updateProductVariant($productId: ID!, $variantId: ID!, $input: ProductVariantInput!) {
  updateProductVariant(
    productId: $productId
    variantId: $variantId
    input: $input
  ) {
    id

}
}`,
    urlEndPoint: oldBeUrl,
  },
  createProductVariant: {
    query: `mutation createProductVariant($productId: ID!, $variantId: ID!) {
  createProductVariant(productId: $productId, variantId: $variantId) {
    variant{
      id
    }

  }
}`,
    urlEndPoint: oldBeUrl,
  },
  getShopVariantOptions: {
    query: `query getShopVariantOptions($id: ID!) {
  shop(id: $id) {
    ...shopVariantOptionFields
    __typename
  }
}

fragment shopVariantOptionFields on Shop {
  variants(shopId: $id) {
    edges {
      node {
          id
  				title {
    						defaultValue
  								}
  				options {
    						id
    						value
  							}
      		}
    	}
  }
}`,
    urlEndPoint: oldBeUrl,
  },

  getShopSalesChannels: {
    query: `query getShopSalesChannels($shopId: ID!) {
  shop(id: $shopId) {
    ...salesChannelListFields
    __typename
  }
}

fragment salesChannelListFields on Shop {
salesChannels {
    edges {
      node {
        id
        title {
          defaultValue
        }
  }
    }
}
}`,
    urlEndPoint: oldBeUrl,
  },

  createProductSalesChannel: {
    query: ` mutation createProductSalesChannel($productId: ID!, $salesChannelId: ID!) {
  createProductSalesChannel(
    productId: $productId
    salesChannelId: $salesChannelId
  ) {
    id
  }
}
`,
    urlEndPoint: oldBeUrl,
  },
};
