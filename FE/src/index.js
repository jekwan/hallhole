import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import App from "./components/App";

import RouterConfiguration from "./configs/router";
import Theme from "./configs/theme";
import Store from "./configs/store";

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <RouterConfiguration />
        <Provider store={Store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
