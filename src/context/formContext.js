import React, { useReducer, useCallback, useEffect, useRef } from "react";
import { actionName } from "../constant/constant";
import reducer from "../reducer/formReducer";
import fetchLoadmore from "../utils/loadMoreGQL";

const FormContext = React.createContext();
const getDataStorage = () => {
  let authData = localStorage.getItem("authData");
  if (authData) {
    return JSON.parse(localStorage.getItem("authData"));
  }
  return { shopid: "", token: "" };
};

const init = {
  internalID: "",
  nameUS: "",
  price: "",
  isActive: "ACTIVE",
  showLoadMore: false,
  isLoadingforMore: false,
  isErrorLoadmore: false,
  allVariants: [],
  selectedVariant: "",
  selectedOption: "",
  allSaleChannel: [],
  selectedSF: "",
};
const FormProvider = ({ children }) => {
  const isMount = useRef(true);
  const authInit = getDataStorage();
  const [formState, dispatch] = useReducer(reducer, { ...init, ...authInit });

  const handleChange = useCallback((e) => {
    const filedName = e.target.name;
    dispatch({
      type: actionName.UPDATE_VALUE,
      payload: { key: filedName, value: e.target.value },
    });
  }, []);

  const handleChangeVariant = (e) => {
    const filedName = e.target.name;
    const newSelectVariant = formState.allVariants.filter(
      (variant) => variant.variantID === e.target.value
    )[0];
    dispatch({
      type: actionName.UPDATE_VALUE,
      payload: { key: filedName, value: newSelectVariant },
    });
  };

  useEffect(() => {
    if (formState.selectedVariant) {
      dispatch({
        type: actionName.UPDATE_VALUE,
        payload: {
          key: "selectedOption",
          value: "",
        },
      });
    }
  }, [formState.selectedVariant]);

  const handleLoadmoreOption = async (e) => {
    e.preventDefault();
    dispatch({ type: actionName.REMOVE_ERR_LOADMORE });
    dispatch({ type: actionName.RUN_LOADING_LOADMORE });
    await fetchLoadmore(formState, dispatch);
    dispatch({ type: actionName.STOP_LOADING_LOADMORE });
  };

  useEffect(() => {
    if (isMount.current) {
      isMount.current = false;
      return;
    }

    if (!formState.isLoadingforMore && !formState.isErrorLoadmore) {
      dispatch({
        type: actionName.SHOW_LOADMORE,
      });
    }
  }, [formState.isLoadingforMore]);

  useEffect(() => {
    localStorage.setItem(
      "authData",
      JSON.stringify({ shopid: formState.shopid, token: formState.token })
    );
  }, [formState.shopid, formState.token]);

  return (
    <FormContext.Provider
      value={{
        formState,
        handleChange,
        handleLoadmoreOption,
        handleChangeVariant,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider, FormContext };
