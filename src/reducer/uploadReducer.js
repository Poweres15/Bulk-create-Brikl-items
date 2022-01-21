import { actionName } from "../constant/constant";

export default function reducer(state, action) {
  if (action.type === actionName.ADD_MESSAGE) {
    return { ...state, message: [...state.message, action.payload] };
  }

  if (action.type === actionName.CLEAR_MESSAGE) {
    return { ...state, message: [] };
  }

  if (action.type === actionName.RUN_LOADING) {
    return { ...state, isLoading: true };
  }

  if (action.type === actionName.STOP_LOADING) {
    return { ...state, isLoading: false };
  }

  if (action.type === actionName.SHOW_MESSAGE) {
    return { ...state, isMessageShow: true };
  }

  if (action.type === actionName.HIDE_MESSAGE) {
    return { ...state, isMessageShow: false };
  }

  return state;
}
