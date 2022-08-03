import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

import rootReducer from "./states";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
