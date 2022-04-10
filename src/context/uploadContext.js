import React, {
  useEffect,
  useReducer,
  useRef,
  useCallback,
  useContext,
} from "react";
import { requestGQLs } from "../utils/mainGQL";
import reducer from "../reducer/uploadReducer";
import { FormContext } from "./formContext";
import { actionName } from "../constant/constant";
import { uploadManualNBE } from "../utils/uploadManualNBE";

const UploadContext = React.createContext();

const init = {
  message: [],
  isLoading: false,
  isMessageShow: false,
};

const UploadProvider = ({ children }) => {
  const isMount = useRef(true);
  const [uploadState, dispatch] = useReducer(reducer, init);
  const { formState } = useContext(FormContext);

  const closeMessage = useCallback(() => {
    dispatch({ type: actionName.HIDE_MESSAGE });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: actionName.RUN_LOADING });
    dispatch({ type: actionName.CLEAR_MESSAGE });
    formState.be === "OBE"
      ? await requestGQLs(formState, dispatch)
      : await uploadManualNBE(formState, dispatch);
    dispatch({ type: actionName.STOP_LOADING });
  };

  useEffect(() => {
    if (isMount.current) {
      isMount.current = false;
      return;
    }

    if (!uploadState.isLoading && uploadState.message.length === 0) {
      dispatch({
        type: actionName.ADD_MESSAGE,
        payload: { showMessage: "Upload product succesfully", type: "success" },
      });
    }
    dispatch({
      type: actionName.SHOW_MESSAGE,
    });
  }, [uploadState.isLoading]);

  return (
    <UploadContext.Provider
      value={{
        uploadState,
        handleSubmit,
        closeMessage,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export { UploadProvider, UploadContext };
