import React, { useReducer, useCallback, useEffect, useRef } from "react";
import { actionName } from "../constant/constant";
import reducer from "../reducer/formReducer";
import fetchLoadmore from "../utils/loadMoreGQL";
import getToken from "../utils/getToken.js";
import shops from "../constant/shop";
import fetchLoadmoreNBE from "../utils/loadMoreGQLNBE";

const FormContext = React.createContext();
const getDataStorage = () => {
  let authData = localStorage.getItem("authData");
  if (authData) {
    return JSON.parse(localStorage.getItem("authData"));
  }

  return { token: "" };
};

window.onbeforeunload = () => {
  localStorage.removeItem("authData");
};

const init = {
  shopid: "",
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
  be: "",
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

  const resetFormstate = () => {
    dispatch({
      type: actionName.RESET_FORM_STATE,
      payload: { ...init, shopid: formState.shopid, be: formState.be },
    });
  };

  const handleChangeShop = (e) => {
    const { id, be } = shops.find((shop) => shop.id === e.target.value);
    dispatch({
      type: actionName.UPDATE_VALUE,
      payload: { key: "shopid", value: id },
    });
    dispatch({
      type: actionName.UPDATE_VALUE,
      payload: { key: "be", value: be },
    });
  };

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
    formState.be === "OBE"
      ? await fetchLoadmore(formState, dispatch)
      : await fetchLoadmoreNBE(formState, dispatch);
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
    dispatch({
      type: actionName.RESET_FORM_STATE,
      payload: {
        ...init,
        shopid: formState.shopid,
        be: formState.be,
        token: formState.token,
      },
    });
  }, [formState.shopid]);

  useEffect(() => {
    const generateToken = async () => {
      const accessToken = await getToken();
      dispatch({
        type: actionName.UPDATE_VALUE,
        payload: { key: "token", value: accessToken },
      });
      localStorage.setItem("authData", JSON.stringify({ token: accessToken }));
    };
    if (formState.token.length === 0) {
      console.log("generatet token");
      generateToken();
    }
  }, [formState.token]);

  return (
    <FormContext.Provider
      value={{
        formState,
        handleChange,
        handleLoadmoreOption,
        handleChangeVariant,
        resetFormstate,
        handleChangeShop,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider, FormContext };
