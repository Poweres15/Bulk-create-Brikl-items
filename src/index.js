import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UploadProvider } from "./context/uploadContext";
import { FormProvider } from "./context/formContext";

ReactDOM.render(
  <FormProvider>
    <UploadProvider>
      <App />
    </UploadProvider>
  </FormProvider>,
  document.getElementById("root")
);
