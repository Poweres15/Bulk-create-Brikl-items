const oldBeUrl = "https://dev.api.mybrikl.com/graphql";
const NBEUrl = "https://dev.internal-api.brikl.com/v1/graphql";
export const authUrl = "https://dev.auth.brikl.com";

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
  GET_SHOP_VARIANT_NBE: "dashboardGetAllProductOptions",
  GET_SHOP_STOREFRONT_NBE: "searchDashboardSalesChannelsNB",
  CREATE_PRODUCT_NBE: "dashboardCreateProductsNB",
  ADD_VARIANT_NBE: "dashboardAssignProductOptionValues",
  ADD_SHOP_STOREFRONT_NBE: "addDashboardProductToSalesChannelNB",
  GET_LIGHT_NBE: "getDashboardLightPresetsNBE",
  DELETE_LIGHT_NBE: "deleteDashboardProductLightPresetNBE",
  GET_PRODUCT_NBE: "dashboardGetProductsNB",
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
  HIDE_LOADMORE: "hideLoadMore",
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
  dashboardGetAllProductOptions: {
    query: `query dashboardGetAllProductOptions($first: Int, $before: String, $last: Int, $after: String) {
  productOptions(first: $first, before: $before, last: $last, after: $after) {
    edges {
      node {
        id
        internalId
        defaultTitle
        type
        values {
          id
          productOptionId
          value
          defaultTitle
        }
      }
    }
  }
}`,
    urlEndPoint: NBEUrl,
  },
  searchDashboardSalesChannelsNB: {
    query: `query searchDashboardSalesChannelsNB($keyword: String!, $after: String, $first: Int = 100) {
  searchSalesChannels(keyword: $keyword, first: $first, after: $after) {
    totalCount
    edges {
      node {
        id
        name
        type
        storeFront {
          id
          title
          logo
        }
        teamStore {
          id
          title
          logo
        }
      }
    }
  }
}`,
    urlEndPoint: NBEUrl,
  },

  dashboardCreateProductsNB: {
    query: `mutation dashboardCreateProductsNB ($input: CreateProductInput!){
  createProduct(input:$input) {
    id
    __typename
  }
}`,
    urlEndPoint: NBEUrl,
  },

  dashboardAssignProductOptionValues: {
    query: `mutation dashboardAssignProductOptionValues($id: ID!, $options: [AssignProductOptionsOptionInput!]!) {
  assignProductOptions(productId: $id, input: {productOptions: $options}) {
    id
    internalId
    defaultTitle
    type
    __typename
  }
}`,
    urlEndPoint: NBEUrl,
  },
  addDashboardProductToSalesChannelNB: {
    query: `mutation addDashboardProductToSalesChannelNB($salesChannelId: ID!, $productId: ID!) {
  addProductToSalesChannel(salesChannelId: $salesChannelId, productId: $productId) {
    id
    __typename
  }
}`,
    urlEndPoint: NBEUrl,
  },
  getDashboardLightPresetsNBE: {
    query: `query getDashboardLightPresetsNBE {
  productLightPresets {
   id
  title
  }
}`,
    urlEndPoint: NBEUrl,
  },
  deleteDashboardProductLightPresetNBE: {
    query: `mutation deleteDashboardProductLightPresetNBE($id: ID!) {
  deleteProductLightPreset(id: $id) {
    success
    __typename
  }
}`,
    urlEndPoint: NBEUrl,
  },

  dashboardGetProductsNB: {
    query: `query dashboardGetProductsNB(
  $filter: ProductsFilterInput!
  $first: Int
  $before: String
  $last: Int
  $after: String
) {
  products(
    filter: $filter
    first: $first
    before: $before
    last: $last
    after: $after
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
      __typename
    }
    edges {
      node {
        id
        defaultTitle
        internalId
        thumbnailUrl
        type
        status
        salesChannels {
          id
          name
          teamStore {
            title
            __typename
          }
          storeFront {
            title
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}`,
    urlEndPoint: NBEUrl,
  },
};
