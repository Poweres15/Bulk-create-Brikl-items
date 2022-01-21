import { actionName } from "../constant/constant";

export default function reducer(state, action) {
  if (action.type === actionName.UPDATE_VALUE) {
    const Key = action.payload.key;
    const Value = action.payload.value;
    return { ...state, [Key]: Value };
  }

  if (action.type === actionName.SET_ERR_LOADMORE) {
    return { ...state, isErrorLoadmore: true };
  }

  if (action.type === actionName.REMOVE_ERR_LOADMORE) {
    return { ...state, isErrorLoadmore: false };
  }

  if (action.type === actionName.ADD_ALL_VARIANTS) {
    return { ...state, allVariants: action.payload };
  }

  if (action.type === actionName.SELECT_VARIANT) {
    return { ...state, selectedVariant: action.payload };
  }

  if (action.type === actionName.SHOW_LOADMORE) {
    return { ...state, showLoadMore: true };
  }
  if (action.type === actionName.RUN_LOADING_LOADMORE) {
    return { ...state, isLoadingforMore: true };
  }

  if (action.type === actionName.STOP_LOADING_LOADMORE) {
    return { ...state, isLoadingforMore: false };
  }

  if (action.type === actionName.ADD_ALL_SALE_CHANNEL) {
    return { ...state, allSaleChannel: action.payload };
  }

  return state;
}
